<template>
    <div>
      <router-view></router-view>
      <Snackbar />
    </div>
</template>


<script>
import Login from "./views/Login";
import Home from "./views/Home";
import SharedNote from "./views/Shared";

import Snackbar from "./components/Snackbar";

export default {
  components: {
    Login,
    Home,
    Snackbar,
    SharedNote,
  },
  data() {
    return {};
  },
  beforeCreate() {
    this.$store.dispatch("autoLogin");
  },


};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
}
</style>
