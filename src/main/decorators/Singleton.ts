import "reflect-metadata";

// 单例模式装饰器
export function Singleton<T extends new (...args: any[]) => {}>(target: T): T {
    const key = Symbol.for(`__singleton__${target.name}`);

    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            if (!Reflect.hasOwnMetadata(key, target)) {
                Reflect.defineMetadata(key, this, target);
            }
            return Reflect.getOwnMetadata(key, target);
        }
    }
}
