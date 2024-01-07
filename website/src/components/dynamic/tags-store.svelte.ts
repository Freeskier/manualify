import type { ManualTag } from "../../global/types.ts";

let tags = $state<ManualTag[]>([]);

export const tagsStore = {
  get tags() {
    return tags;
  },
  addNewTag: (tag: ManualTag) => (tags = [...tags, tag]),
  removeTag: (tag: ManualTag) =>
    tags.splice(
      tags.findIndex((x) => x.id === tag.id),
      1
    ),
};
