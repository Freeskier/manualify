import type { ManualComponent, ManualStep } from "../../global/types";

let steps = $state<ManualStep[]>([]);

export const stepsStore = {
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
    steps = steps;
    console.log(steps);
  },
  toggleOpen: (id: string) => {
    let step = findStep(id);
    step.isOpen = !step.isOpen;
  },
  updateComponents: (newComp: ManualComponent[], id: string) => {
    let step = findStep(id);
    step.components = newComp;
    updateComponentIndex();
  },
  setComponentAsAnimated: (id: string) => {
    let component = findComponent(id);
    component.isAnimatedOnAdd = true;
  },
  deleteComponent: (id: string) => {
    steps.map((x) => (x.components = x.components.filter((x) => x.id !== id)));
    updateComponentIndex();
  },
  deleteStep: (id: string) => {
    steps.splice(
      steps.findIndex((x) => x.id === id),
      1
    );
    updateStepIndex();
  },
  moveStepUp: (id: string) => {
    console.log(id)
    let step = findStep(id)
    moveStep(step.index, step.index - 1)
    // updateStepIndex()
  },
  moveStepDown: (id: string) => {
    console.log(id)
    let step = findStep(id)
    moveStep(step.index, step.index + 1)
    // updateStepIndex()
  }
};

function findStep(id: string) {
  let step = steps.find((x: ManualStep) => x.id === id);
  if (!step) throw Error(`Can't find step: ${id}`);
  return step;
}

function findComponent(id: string) {
  let component = steps
    .find((c) => c.components.some((x) => x.id === id))
    ?.components.find((x) => x.id === id);
  if (!component) throw Error(`Can't find component: ${id}`);
  return component;
}

function updateComponentIndex() {
  let components = steps.flatMap((x) => x.components);
  let indexes = {};
  components.forEach((x) => {
    let i = indexes[x.type] ? ++indexes[x.type] : 1;
    x.index = i;
    indexes[x.type] = i;
  });
}

function updateStepIndex() {
  steps.forEach((step, index) => (step.index = index + 1));
}

function moveStep(fromIndex, toIndex) {
  var element = steps[fromIndex];
  steps.splice(fromIndex, 1);
  steps.splice(toIndex, 0, element);
}
