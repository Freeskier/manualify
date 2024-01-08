import type { ManualEvent } from "../../global/types";

let events = $state<ManualEvent[]>([]);

export const eventsStore = {
  set subscribe(value: ManualEvent) {
    events.push(value);
  },
  rise: (type: string, message: any) =>
    events.filter((x) => x.type === type).forEach((x) => x.callback(message)),
};
