<template>
    <div id="card">
        <div class="card_header">
            <span>Создано</span>
            <span>{{this.created}}</span>
        </div>
        <div class="card_body" >
           <div v-html="compiled" class="html_cont"></div>
        </div>
         <span class="modified" v-if="modified">Изменено в {{this.modified}}</span>
        <div class="card_actions">
            <router-link :to="'./mynotes/'+ this.id">
                Open
            </router-link>
        </div>
    </div>
</template>

<script>

import marked from 'marked';

export default {
    name : "Note",
    props : ["id", "noteName", "content", "created", "modified"],
    data() {
        return {
            
        }
    },
    computed: {
        compiled(){
            return marked(this.content, {sanitize: true});
        }
    }
}
</script>

<style lang="scss" scoped>
    #card {
        transition: all .3s ease-in;
        display: flex;
        flex-direction: column;
        width: 300px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 2px #e7e7e7;
        margin: .4em;

        .card_header {
            display: flex;
            justify-content: space-between;
            padding: .8rem .7rem;
            color: rgb(216, 216, 216);
            font-size: 14px;
        }
        .card_body {
            padding: 1rem;
            margin: .2rem 0;
            height: 100px;
            overflow: hidden;
            
            .html_cont {
                text-align: justify;
            }
            
            
        }
        .modified {
                display: block;
                padding: 1rem;
                color: #eee;
                margin-top: .3rem;
                font-size: 14px;
                text-align: end;
            }
        .card_actions {
            display: flex;
            margin: .7rem 0;
            justify-content: space-around;

            a {
                text-decoration: none;
                padding: .4rem;
                border: none;
                outline: none;
                border-radius: 5px;
                background-color: #51db74;
                color: #fff;
                cursor: pointer;
            }
        }

        &:hover {
            
            transform: scale(1.02);

        }
    }
    @media only screen and (max-width: 768px){
        #card {
            width: 100%;
        }
    }
</style>