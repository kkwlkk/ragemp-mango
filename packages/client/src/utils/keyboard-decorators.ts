import type { ExecutionContext, Guard, MangoRequest, MangoResponse } from '../interfaces';

/**
 * Windows Virtual Key codes for use with mp.keys.bind().
 * Based on: https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
 *
 * Note: The @ragempcommunity/types-client package does not include a key code enum,
 * so we provide this enum for developer convenience.
 */
export enum KeyCode {
    Backspace = 0x08,
    Tab = 0x09,
    Enter = 0x0D,
    Shift = 0x10,
    Ctrl = 0x11,
    Alt = 0x12,
    Pause = 0x13,
    CapsLock = 0x14,
    Escape = 0x1B,
    Space = 0x20,
    PageUp = 0x21,
    PageDown = 0x22,
    End = 0x23,
    Home = 0x24,
    Left = 0x25,
    Up = 0x26,
    Right = 0x27,
    Down = 0x28,
    Insert = 0x2D,
    Delete = 0x2E,
    Key0 = 0x30,
    Key1 = 0x31,
    Key2 = 0x32,
    Key3 = 0x33,
    Key4 = 0x34,
    Key5 = 0x35,
    Key6 = 0x36,
    Key7 = 0x37,
    Key8 = 0x38,
    Key9 = 0x39,
    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
    Q = 0x51,
    R = 0x52,
    S = 0x53,
    T = 0x54,
    U = 0x55,
    V = 0x56,
    W = 0x57,
    X = 0x58,
    Y = 0x59,
    Z = 0x5A,
    Numpad0 = 0x60,
    Numpad1 = 0x61,
    Numpad2 = 0x62,
    Numpad3 = 0x63,
    Numpad4 = 0x64,
    Numpad5 = 0x65,
    Numpad6 = 0x66,
    Numpad7 = 0x67,
    Numpad8 = 0x68,
    Numpad9 = 0x69,
    NumpadMultiply = 0x6A,
    NumpadAdd = 0x6B,
    NumpadSubtract = 0x6D,
    NumpadDecimal = 0x6E,
    NumpadDivide = 0x6F,
    F1 = 0x70,
    F2 = 0x71,
    F3 = 0x72,
    F4 = 0x73,
    F5 = 0x74,
    F6 = 0x75,
    F7 = 0x76,
    F8 = 0x77,
    F9 = 0x78,
    F10 = 0x79,
    F11 = 0x7A,
    F12 = 0x7B,
    NumLock = 0x90,
    ScrollLock = 0x91,
    Semicolon = 0xBA,
    Equal = 0xBB,
    Comma = 0xBC,
    Minus = 0xBD,
    Period = 0xBE,
    Slash = 0xBF,
    Backquote = 0xC0,
    BracketLeft = 0xDB,
    Backslash = 0xDC,
    BracketRight = 0xDD,
    Quote = 0xDE,
}

interface KeyEventParameters {
    key: number;
}

export class KeyGuard implements Guard {
    public constructor(private readonly key: KeyCode) {}

    public canActivate(
        context: ExecutionContext<MangoRequest<KeyEventParameters>, MangoResponse>,
    ) {
        const eventKey = context.request.body.key;
        return eventKey === this.key;
    }
}

// Storage for key bindings to allow unbinding
type KeyHandler = () => void;
const keyBindings = new Map<string, KeyHandler>();

/**
 * Decorator that binds a method to be called when a key is released (keyup).
 * Uses mp.keys.bind internally with keydown=false.
 *
 * @param key - The key code to bind to
 * @example
 * ```typescript
 * @OnKeyUp(KeyCode.F2)
 * onF2Released() {
 *     mp.gui.chat.push("F2 was released");
 * }
 * ```
 */
export function OnKeyUp(key: KeyCode): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const bindingKey = `${target.constructor.name}_${String(propertyKey)}_keyup_${key}`;

        // Store original method for later binding
        Reflect.defineMetadata('mango:keyup', { key, bindingKey }, target, propertyKey);

        // The actual binding happens when the controller is initialized
        const handler: KeyHandler = function(this: any) {
            return originalMethod.apply(this, arguments);
        };

        keyBindings.set(bindingKey, handler);

        // Bind the key on script load
        if (typeof mp !== 'undefined' && mp.keys) {
            mp.keys.bind(key, false, handler);
        }

        return descriptor;
    };
}

/**
 * Decorator that binds a method to be called once when a key is released, then unbinds.
 *
 * @param key - The key code to bind to
 * @example
 * ```typescript
 * @OnceKeyUp(KeyCode.F3)
 * onF3ReleasedOnce() {
 *     mp.gui.chat.push("F3 was released (only fires once)");
 * }
 * ```
 */
export function OnceKeyUp(key: KeyCode): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const bindingKey = `${target.constructor.name}_${String(propertyKey)}_oncekeyup_${key}`;

        Reflect.defineMetadata('mango:oncekeyup', { key, bindingKey }, target, propertyKey);

        const handler: KeyHandler = function(this: any) {
            // Unbind after first call
            if (typeof mp !== 'undefined' && mp.keys) {
                mp.keys.unbind(key, false, handler);
            }
            keyBindings.delete(bindingKey);
            return originalMethod.apply(this, arguments);
        };

        keyBindings.set(bindingKey, handler);

        if (typeof mp !== 'undefined' && mp.keys) {
            mp.keys.bind(key, false, handler);
        }

        return descriptor;
    };
}

/**
 * Decorator that binds a method to be called when a key is pressed down (keydown).
 * Uses mp.keys.bind internally with keydown=true.
 *
 * @param key - The key code to bind to
 * @example
 * ```typescript
 * @OnKeyDown(KeyCode.F2)
 * onF2Pressed() {
 *     mp.gui.chat.push("F2 was pressed");
 * }
 * ```
 */
export function OnKeyDown(key: KeyCode): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const bindingKey = `${target.constructor.name}_${String(propertyKey)}_keydown_${key}`;

        Reflect.defineMetadata('mango:keydown', { key, bindingKey }, target, propertyKey);

        const handler: KeyHandler = function(this: any) {
            return originalMethod.apply(this, arguments);
        };

        keyBindings.set(bindingKey, handler);

        if (typeof mp !== 'undefined' && mp.keys) {
            mp.keys.bind(key, true, handler);
        }

        return descriptor;
    };
}

/**
 * Decorator that binds a method to be called once when a key is pressed, then unbinds.
 *
 * @param key - The key code to bind to
 * @example
 * ```typescript
 * @OnceKeyDown(KeyCode.F4)
 * onF4PressedOnce() {
 *     mp.gui.chat.push("F4 was pressed (only fires once)");
 * }
 * ```
 */
export function OnceKeyDown(key: KeyCode): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const bindingKey = `${target.constructor.name}_${String(propertyKey)}_oncekeydown_${key}`;

        Reflect.defineMetadata('mango:oncekeydown', { key, bindingKey }, target, propertyKey);

        const handler: KeyHandler = function(this: any) {
            // Unbind after first call
            if (typeof mp !== 'undefined' && mp.keys) {
                mp.keys.unbind(key, true, handler);
            }
            keyBindings.delete(bindingKey);
            return originalMethod.apply(this, arguments);
        };

        keyBindings.set(bindingKey, handler);

        if (typeof mp !== 'undefined' && mp.keys) {
            mp.keys.bind(key, true, handler);
        }

        return descriptor;
    };
}

/**
 * Utility function to check if a key is currently pressed down.
 * Wraps mp.keys.isDown.
 *
 * @param key - The key code to check
 * @returns true if the key is pressed, false otherwise
 */
export function isKeyDown(key: KeyCode): boolean {
    if (typeof mp !== 'undefined' && mp.keys) {
        return mp.keys.isDown(key);
    }
    return false;
}

/**
 * Utility function to check if a key is currently released.
 * Wraps mp.keys.isUp.
 *
 * @param key - The key code to check
 * @returns true if the key is released, false otherwise
 */
export function isKeyUp(key: KeyCode): boolean {
    if (typeof mp !== 'undefined' && mp.keys) {
        return mp.keys.isUp(key);
    }
    return true;
}

/**
 * Manually bind a key handler.
 *
 * @param key - The key code to bind
 * @param keydown - true for keydown, false for keyup
 * @param handler - The function to call
 */
export function bindKey(key: KeyCode, keydown: boolean, handler: KeyHandler): void {
    if (typeof mp !== 'undefined' && mp.keys) {
        mp.keys.bind(key, keydown, handler);
    }
}

/**
 * Manually unbind a key handler.
 *
 * @param key - The key code to unbind
 * @param keydown - true for keydown, false for keyup
 * @param handler - Optional specific handler to unbind
 */
export function unbindKey(key: KeyCode, keydown: boolean, handler?: KeyHandler): void {
    if (typeof mp !== 'undefined' && mp.keys) {
        if (handler) {
            mp.keys.unbind(key, keydown, handler);
        } else {
            mp.keys.unbind(key, keydown);
        }
    }
}

/**
 * Unbind all key bindings created by decorators.
 */
export function unbindAllKeys(): void {
    if (typeof mp !== 'undefined' && mp.keys) {
        keyBindings.forEach((handler, bindingKey) => {
            const parts = bindingKey.split('_');
            const keyStr = parts.pop();
            if (!keyStr) return;
            const isKeydown = bindingKey.includes('keydown');
            const key = parseInt(keyStr, 10);
            mp.keys.unbind(key, isKeydown, handler);
        });
        keyBindings.clear();
    }
}
