import fetch from 'node-fetch';
export const loaders =[
  async () => ({
    currentUser: await (
      await fetch("https://jsonplaceholder.typicode.com/todos/1")
    ).json(),
  }),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}