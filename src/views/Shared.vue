<template>
  <div class="shared_block">
    <div class="paper">
      <span> &#x2756; Режим Чтения</span>
      <hr>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>


<script>

import marked from 'marked';

export default {
  name: 'SharedNote',
  data() {
    return {
      note: '',
    };
  },
  computed: {
      compiledMarkdown(){
          return marked(this.note, {sanitize: true})
      }
  },
  created() {
      this.$store.dispatch("getSharedNote", {
          owner: this.$route.params.owner,
          note : this.$route.params.note
      }).then((note) => {
          this.note = note.note
      }).catch((E) => {
          console.log(E);
      })
  },
};
</script>

<style lang="scss" scoped>

.shared_block {
  display: flex;
  justify-content: center;
  align-items: center;
  
  .paper {
    margin: 1rem auto;
    padding: 1rem;
    width: 70%;
    background-color: #fafafa;
    height: 100%;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select:none; 
    -o-user-select:none;
  }
  span {
    display: block;
    margin: 1rem 0;
    color: #fd5c51;
  }
  hr {
    background: silver;
    box-shadow: none;
    border: none;
    height: 1px;
    margin: .4rem 0;
  }
}
</style>