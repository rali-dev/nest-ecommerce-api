import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserQueryDto } from '../dtos/user-query.dto';
import { Prisma, User } from '../../generated/prisma/client';
import { userSortFunction } from '../../shared/utils/sort-utils';
import { UserDto } from '../dtos/user.dto';
import { normalizeEmail } from '../../shared/utils/email-utils';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { SafeUserSelect, SafeUser } from '../user.select';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(
    queryParams: UserQueryDto,
  ): Promise<{ users: SafeUser[]; count: number }> {
    const { page = 1, limit = 5, lastName, mobile, sort } = queryParams;

    const where: Prisma.UserWhereInput = {};

    if (lastName) {
      where.lastName = { contains: lastName, mode: 'insensitive' };
    }
    if (mobile) {
      where.mobile = { contains: mobile, mode: 'insensitive' };
    }

    const orderBy = userSortFunction(sort);

    const users = await this.prismaService.user.findMany({
      where,
      orderBy: orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: SafeUserSelect,
    });

    const count = await this.prismaService.user.count({ where });

    return { users, count };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (user) {
      return user;
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async create(body: UserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...body,
        email: normalizeEmail(body.email),
      },
    });
  }

  async update(id: string, body: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const user = await this.prismaService.user.update({
      where: { id: id },
      data: {
        ...body,
        email: body.email ? normalizeEmail(body.email) : undefined,
      },
    });

    return user;
  }

  async delete(id: string): Promise<User> {
    await this.findOne(id);

    const user = await this.prismaService.user.delete({
      where: { id: id },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email: normalizeEmail(email) },
    });
    return user;
  }

  async signin(body: AuthDto) {
    const { email, password } = body;

    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const payload = { sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    }
  }
}
