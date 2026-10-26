import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto';
@Injectable()
export class BlogService {
  private blogs = [
    { _id: 1, title: 'title 1', content: 'content 1' },
    { _id: 2, title: 'title 2', content: 'content 2' },
    { _id: 3, title: 'title 3', content: 'content 3' },
  ];

  findAll() {
    return this.blogs;
  }

  findOne(id: string) {
    const blog = this.blogs.find((item) => item._id.toString() === id);
    if (blog) {
      return blog;
    } else {
      throw new NotFoundException();
    }
  }

  create(body: BlogDto) {
    const id = Math.random();
    const newBlog = { ...body, _id: id };
    this.blogs.push(newBlog);
    return newBlog;
  }

  update(id: string, body: BlogDto) {
    const blog = this.findOne(id);
    blog.title = body.title;
    blog.content = body.content;
    return blog;
  }

  delete(id: string){
    const blog = this.findOne(id)
    const newBlogs = this.blogs.filter(item => item._id !== blog._id);
    this.blogs = newBlogs;
  }
}
