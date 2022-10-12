type TypedGet = <T>(key: string) => T | undefined;

export interface AppLocals extends Record<string, unknown> {
  get: TypedGet;
  set<T>(key: string, value: T): this;
}

export function appLocalsFactory(): AppLocals {
  const map = new Map<string, unknown>();

  const proxy = new Proxy(map, {
    get(target, prop, receiver) {
      if (prop in target || typeof prop === "symbol") {
        return Reflect.get(target, prop, receiver);
      }

      return target.get(prop);
    },
    set(target, prop, value) {
      if (typeof prop === "string") {
        target.set(prop, value);
      }

      throw new Error("Invalid property access");
    },
  });

  proxy.get = <T>(key: string) => proxy.get(key) as T | undefined;
  proxy.set = <T>(key: string, value: T) => proxy.set(key, value) as typeof map;

  return proxy as unknown as AppLocals;
}
