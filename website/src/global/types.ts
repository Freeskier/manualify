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
  isAnimatedOnAdd: boolean;
};

export type ManualStep = {
  id: string;
  index: number;
  title: string;
  components: ManualComponent[];
  stepState: ManualStepState;
  isOpen: boolean;
};
