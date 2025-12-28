import type { MyEvent } from '../src/enums';

declare global {
    namespace MangoEvents {
        interface CustomServerToWebViewEvent {
            [MyEvent.EatMango]: (body: { mangoId: number }) => boolean;
        }
    }
}

export {};
