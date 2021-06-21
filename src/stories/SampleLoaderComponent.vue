<template>
  <div>
    <h1>This is a sample component to demonstrate loaders</h1>
    <div>
    <h2>Todo props has the following inside</h2>
    </div>
    
    <div>
      {{ todo }}
    </div>
  </div>
</template>

<script>
export default {
  name: "sampleloader",
  props: {
    todo: {
      type: String,
      default: "Something",
    },
  },
};
</script>

<style></style>
