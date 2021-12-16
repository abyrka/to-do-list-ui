<template>
  <Slide>
    <a id="home" href="/">
      <span>Home</span>
    </a>
    <a id="about" href="/about">
      <span>About</span>
    </a>
  </Slide>
  <router-view />
</template>

<script>
import { Slide } from "vue3-burger-menu";

export default {
  components: {
    Slide,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
