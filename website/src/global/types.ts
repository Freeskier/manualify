import { ComponentType, SvelteComponent } from "svelte";

export type ManualComponentOption =
  | "text"
  | "checkbox"
  | "table"
  | "image"
  | "quote"
  | "code"
  | "link";

export type ManualStepState = "editing" | "important" | "done";

export type ManualComponent = {
  id: string;
  index: number;
  type: ManualComponentOption;
  content: string;
};

export type ManualStep = {
  id: string;
  index: number;
  title: string;
  icon: string;
  components: ManualComponent[];
  stepState: ManualStepState;
  isOpen: boolean;
};

export type ManualStepOption = {
  onclick: () => void;
  icon: string | ComponentType<SvelteComponent>;
  text: string;
  color?: string;
};

export type ManualTag = {
  id: string;
  text: string;
  color: string;
};

export type ManualEvent<T> = {
  type: string;
  callback: (payload: T) => void;
};

export type ManualEvents = {
  test1: string
  test2: number
}