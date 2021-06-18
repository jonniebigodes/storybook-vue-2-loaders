<template>
  <div>
    <h1>This is a sample component to demonstrate loaders</h1>
    <h2>Todo props has the following inside</h2>
    <h3>userId:{{ userId }}</h3>
    <h3>id:{{ id }}</h3>
    <h3>title:{{ title }}</h3>
    <h3>completed:{{ completed }}</h3>
  </div>
</template>

<script>
export default {
  name: "sampleloader",
  props: {
    userId:{
      type:Number,
      default:0,
    },
    id:{
      type:Number,
      default:0,
    },
    title:{
      type:String,
      default:'Sanple TODO',
    },
    completed:{
      type:Boolean,
      default:false,

    }
  },
};
</script>

<style></style>
