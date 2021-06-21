import SampleLoaderComponent from "./SampleLoaderComponent.vue";
import fetch from "node-fetch";

export default {
  component: SampleLoaderComponent,
  title: "LoaderExample",
  // commenting this defaults to the props default (Something)  as opposed to what should be the value
  argTypes: {
    todo: {
      control: {
        type: "object",
      },
      defaultValue: {
        userId: 0,
        id: 0,
        title: "Sample Todo",
        completed: false,
      },
    },
  },
};

export const SampleStory = (args, { argTypes, loaded: { todo } }) => {
  console.log("args before", args.todo);

  args.todo = JSON.stringify(todo, null, 2);

  console.log("args after", args);
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent v-bind="$props" />`,
  };
};
SampleStory.loaders = [
  async () => ({
    todo: await (
      await fetch("https://jsonplaceholder.typicode.com/todos/1")
    ).json(),
  }),
];

export const AnotherStory = (args, { argTypes, loaded: { currentUser } }) => {
  console.log(`AnotherStory args before:${JSON.stringify(args, null, 2)}`);
  console.log(`currentUser request :${JSON.stringify(currentUser, null, 2)}`);
  console.log(`current user:${JSON.stringify(currentUser, null, 2)}`);
  args.todo = currentUser;
  console.log(
    `AnotherStory args after:${JSON.stringify(currentUser, null, 2)}`
  );
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent v-bind="$props" />`,
  };
};
