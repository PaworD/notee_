<template>
    <div id="app">
    <LoginComponent class="login"/>       
    </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
export default {
    components: {
        LoginComponent
    },
    data() {
        return {
            
        }
    },
    
}
</script>

<style lang="scss" scoped>
    #app {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .login{
        margin: 2rem;

    }
</style>