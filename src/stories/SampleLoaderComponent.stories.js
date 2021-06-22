import SampleLoaderComponent from "./SampleLoaderComponent.vue";
import fetch from "node-fetch";

export default {
  component: SampleLoaderComponent,
  title: "LoaderExample",
  /* With this commented the control will be processed as a string and leads to Invalid prop: type check failed for prop "todo". Expected Object, got String with value "{
      userId: 0,
      id: 0,
      title: "Sanple TODO",
      completed: false,
    }". 
    Without it commented it doesn't update the component's prop and keeps the default value below
    */

  /* argTypes: {
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
  }, */
};

export const SampleStory = (args, { argTypes, loaded: { todo } }) => {
  
  console.log("todo",todo);
  
  
  // updates the args
  console.log(`args before`,args.todo)
  args.todo= todo // all hail mary attempt to add bind the prop, does not work
  console.log(`args after`,args.todo)
  //
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    //template: `<SampleLoaderComponent :todo="todo" />`,
    template: `<SampleLoaderComponent v-bind="$props" />`,
  };
};
SampleStory.args={
  todo:{
    userId:0,
    id:0,
    title:'Sample',
    completed:false
  },
}
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
    //template: `<SampleLoaderComponent v-bind="$props" />`,
    template: `<SampleLoaderComponent :todo="currentUser" />`,
  };
};
