<template>
  <div id="app">
    <div class="container">
      <h1>Симулятор светофора</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.container {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>