import SampleLoaderComponent from "./SampleLoaderComponent.vue";
import fetch from "node-fetch";

export default {
  component: SampleLoaderComponent,
  title: "LoaderExample",
  
};

// TypeError: Cannot read property 'loaded' of undefined
// what's missing here
/* export const SampleStory = (args, { argTypes }, { loaded: { todo } }) => {
  console.log(`todo:${JSON.stringify(todo, null, 2)}`);
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent />`,
  };
}; */

// using async here returns =>todo:[object Promise]
/* SampleStory.loaders = [
  async () => ({
    todo: (await fetch("https://jsonplaceholder.typicode.com/todos/1")).json(),
  }),
]; */



// this works but how to pass it to the component??

/* Throws this=>Invalid prop: type check failed for prop "todo". Expected Object, got String with value{
  userId: 0,
  id: 0,
  title: "Sanple TODO",
  completed: false,
}" */
// Which is actually not true because type checking the todo it's being reported as an object
export const SampleStory = (args, { argTypes, loaded: { todo } }) => {
  console.log(`todo is a ${typeof todo} \n with the following value:${JSON.stringify(todo, null, 2)}`);

  /* args.todo={
    userId:todo.userId,
    id:todo.id,
    title:todo.title,
    completed:todo.completed
  } */
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    //template: `<SampleLoaderComponent v-bind="$props"/>`,
    template: `<SampleLoaderComponent :todo="todo"/>`, // Seems that the todo is being inferred as a string for some reason when bubbles up 
  };
};
SampleStory.loaders = [
  async () => ({
    todo: await fetchTodo(),
  }),
];

async function fetchTodo() {
  try {
    const fetchRequest = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const response = fetchRequest.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// comes from global loaders (.storybook/preview.js)
// despite being fetched and logged in the console it throws
//Property or method "currentUser" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based

export const AnotherStory = (args, { argTypes, loaded: { currentUser } }) => {
  console.log(`current user:${JSON.stringify(currentUser, null, 2)}`);
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent :todo="currentUser"/>`,
  };
};