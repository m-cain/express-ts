import { AppLocals, appLocalsFactory } from "./app-locals";
import { MiddlewareFn } from "./middleware";
import { Router } from "./Router";
import { EventEmitter } from "node:events";
import { RegisterRoute } from "./routes";

export class Express extends EventEmitter {
  // Built-in middleware

  public readonly json: MiddlewareFn;
  public readonly raw: MiddlewareFn;
  public readonly static: MiddlewareFn;
  public readonly text: MiddlewareFn;
  public readonly urlencoded: MiddlewareFn;

  // App properties

  public readonly locals: AppLocals;

  constructor() {
    super();
    this.locals = appLocalsFactory();
  }

  // middleware

  public use(...args: unknown[]): void {}

  // Route handlers

  public all: RegisterRoute;

  public get: RegisterRoute;

  public post: RegisterRoute;

  public put: RegisterRoute;

  public delete: RegisterRoute;

  public route(path: string): Router;

  public param(name: string, cb: Function): void {}

  // http

  public listen(port: number): Promise<void>;
  public listen(port: number, cb?: (err: unknown) => void): void;
  public async listen(
    port: number,
    cb?: (err: unknown) => void
  ): Promise<void> | void {}

  // legacy instance factories

  public Router(): Router {
    return new Router();
  }

  // app property/setting methods

  public disable(name: string): void {}

  public enable(name: string): void {}

  public get(name: string): unknown {}

  public set(name: string, value: unknown): void {}

  // computed app properties

  public get mountPath(): string {}

  public get disabled(name: string): boolean {}

  public get enabled(name: string): boolean {}

  public get path(): string {}

  // templating

  engine(ext: string, cb: Function) {}

  render(name: string, cb: Function) {}
}
