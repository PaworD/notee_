<template>
<div class="snackbar" v-if="show">
  <div >
    {{ message }}
    <button text @click="show = false">Ок</button>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      timer : null,
    }
  },

  watch: {
    active(){
      this.timeout();
    }
  },

  methods: {
    timeout(){
      if(this.show){
        
      this.timer = setTimeout(() => {
        this.show = false;
      }, 1500);
      }
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      
      if (mutation.type === 'showMessage') {
        this.message = state.snackbar.content
        this.show = true;
        this.timeout(); 
      }
    })
  }
}
</script>

<style lang="scss"scoped>
    .snackbar{
      background-color: rgb(40, 226, 118);
      border-radius: 5px;
      padding: 0 0 0 .7rem;
      color: #fafafa;
      position: absolute;
      bottom: 2rem;
      right: 3rem;
    }
    button {
      border: 0;
      border-left: 1px solid #fff;
      outline: 0;
      padding: 1rem;
      color: #fafafa;
      margin-left: 5px;
      background: transparent;
      cursor: pointer;
    }
</style>