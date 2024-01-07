import type { ManualStep } from "../global/types";

export function getComponentName(componentType: string) {
  switch (componentType) {
    case "checkbox":
      return "Check list";
    case "code":
      return "Code block";
    case "image":
      return "Image";
    case "link":
      return "Link";
    case "quote":
      return "Quote";
    case "table":
      return "Table";
    case "text":
      return "Text";
  }
}

export const getComponentIcon = (componentType: string): string => {
  switch (componentType) {
    case "checkbox":
      return "material-symbols:checklist";
    case "code":
      return "material-symbols:code";
    case "image":
      return "la:image";
    case "link":
      return "ic:sharp-link";
    case "quote":
      return "grommet-icons:block-quote";
    case "table":
      return "tdesign:table";
    case "text":
      return "mdi:text";
    default:
      return "mdi:text";
  }
};

export const getStepAccentColor = (step: ManualStep) => {
  switch (step.stepState) {
    case "editing":
      return "var(--clr-neutral-400)";
    case "important":
      return "var(--clr-yellow-400)";
    case "done":
      return "var(--clr-green-400)";
  }
};
