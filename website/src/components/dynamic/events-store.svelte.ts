import type { ManualEvents } from "../../global/types";

type ManualEventType = keyof ManualEvents;

let listeners = $state<{[K in ManualEventType]?: Array<(event: ManualEvents[K]) => void>}>({});
function subscribe<T extends ManualEventType>(eventType: T, listener: (event: ManualEvents[T]) => void): void {
  listeners[eventType] = listeners[eventType] || [];
  listeners[eventType]!.push(listener);
}

function raise<T extends ManualEventType>(eventType: T, event: ManualEvents[T]): void {
  listeners[eventType]?.forEach(listener => listener(event));
}

export const eventsStore =  { subscribe, raise };

