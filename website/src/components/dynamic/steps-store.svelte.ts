import type { ManualComponent, ManualStep } from "../../global/types";

//@ts-ignore
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
    let step = findStep(id);
    moveStep(step, "up");
    updateStepIndex();
  },
  moveStepDown: (id: string) => {
    let step = findStep(id);
    moveStep(step, "down");
    updateStepIndex();
  },
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

function moveStep(step: ManualStep, direction: "up" | "down") {
  var fromIndex = steps.findIndex((x) => x.id === step.id);
  var dir = direction === "up" ? -1 : 1;
  var toIndex = fromIndex + dir;

  if (toIndex < 0 || toIndex > steps.length) return;
  steps.splice(fromIndex, 1);
  steps.splice(toIndex, 0, step);
}
