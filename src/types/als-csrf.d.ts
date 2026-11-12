declare module 'als-csrf' {
  import type { RequestHandler } from 'express';

  function csrf(options?: Record<string, unknown>): RequestHandler;
  export = csrf;
}
