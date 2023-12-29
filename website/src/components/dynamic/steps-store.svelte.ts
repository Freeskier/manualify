import type {
  ManualComponent,
  ManualComponentOption,
  ManualStep,
} from "../../global/types";

export function stepsStore() {
  //@ts-ignore
  let steps = $state<ManualStep[]>([]);

  return {
    get steps() {
      return steps;
    },
    addNewStep: () => {
      steps.push({
        id: self.crypto.randomUUID(),
        components: [],
        index: steps.length + 1,
        title: "Random title",
        stepState: "done",
        isOpen: true,
      });
    },
    toggleOpen: (id: string) => {
      let step = steps.find((x: ManualStep) => x.id === id);

      if (!step) throw Error(`Can't find step: ${id}`);

      step.isOpen = !step.isOpen;
    },
    updateComponents: (newComp: ManualComponent[], id: string) => {
      let step = steps.find((x: ManualStep) => x.id === id);

      if (!step) throw Error(`Can't find step: ${id}`);

      step.components = newComp;
    },
  };
}
