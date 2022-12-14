<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Home</h1>
    <router-link to="/a">to a</router-link>
    <router-link to="/b">to b</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>
