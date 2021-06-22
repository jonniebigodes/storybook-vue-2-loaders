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


/* With the component prop set to a String and pushing the JSON (todo) it throws
Invalid prop: type check failed for prop "todo". Expected String, got Object 
What is happening here????'

*/
export const SampleStory = (args, { argTypes, loaded: { todo } }) => {
  console.log("todo", todo);

  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    //template: `<SampleLoaderComponent v-bind="$props" />`,
    template: `<SampleLoaderComponent :todo="todo" />`,
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
