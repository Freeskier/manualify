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
