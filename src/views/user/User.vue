<template>
  <section>
    <h1>User: {{$store.state.user.name}}</h1>
    <p>{{$store.state.user}}</p>
  </section>
</template>

<script>
export default {
  name: "User"
};
</script>

<style>
</style>