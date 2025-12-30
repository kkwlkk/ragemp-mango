declare namespace Reflect {
    function getMetadata<T = unknown>(metadataKey: unknown, target: object): T | undefined;
    function getMetadata<T = unknown>(metadataKey: unknown, target: object, propertyKey: string | symbol): T | undefined;
    function defineMetadata<T = unknown>(metadataKey: unknown, metadataValue: T, target: object): void;
    function defineMetadata<T = unknown>(metadataKey: unknown, metadataValue: T, target: object, propertyKey: string | symbol): void;
}
