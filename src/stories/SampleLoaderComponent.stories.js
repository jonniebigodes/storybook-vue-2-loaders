import SampleLoaderComponent from "./SampleLoaderComponent.vue";
import fetch from "node-fetch";

export default {
  component: SampleLoaderComponent,
  title: "LoaderExample",
};

export const SampleStory = (args, { argTypes, loaded: { todo } }) => {
  console.log(`todo:${JSON.stringify(todo, null, 2)}`);
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent :userId="${todo.userId}" :id="${todo.id}" title="${todo.title}" :completed="${todo.completed}"/>`,
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

export const AnotherStory = (args, { argTypes, loaded: { currentUser } }) => {
  console.log(`current user:${JSON.stringify(currentUser, null, 2)}`);
  return {
    props: Object.keys(argTypes),
    components: { SampleLoaderComponent },
    template: `<SampleLoaderComponent :userId="${currentUser.userId}" :id="${currentUser.id}" title="${currentUser.title}" :completed="${currentUser.completed}"/>`,
  };
};