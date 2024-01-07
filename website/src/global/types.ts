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
  onClick: () => void;
  icon: string | ComponentType<SvelteComponent>;
  text: string;
  color?: string;
};

export type ManualTag = {
  id: string;
  text: string;
  color: string;
};
