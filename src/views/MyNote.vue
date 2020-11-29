<template>
<div>
<div class="toolbar">
    <span>
        Назад
    </span>
</div>
    <div class="single_note">
        <div class="tools">
            <div class="button_group">
                <button @click="updateModal = true">
                    Изменить
                </button>
                <button @click="showModal = true">
                    Удалить
                </button>
            </div>
            
        </div>
        <div class="note_content" v-html="compiledMarkdown">

        </div>
        <div class="note_footer">
            <span class="shared_link"> Ссылка: </span>
<a class="shared_link" :href="note.link">
                 :{{note.link}}
            </a>
        </div>
        <ConfirmModal v-if="showModal" @close="showModal = false" @confirm="deleteNote()">
            <template slot="header">
                <h3>Удаление Записи</h3>
            </template>
            <template slot="body">
                <h6>Вы уверены что хотите удалить эту заметку?</h6>
            </template>
        </ConfirmModal>
        <UpdateModal :note="note" @close="updateModal= false" v-if="updateModal" />
    </div>
    </div>
</template>

<script>

import marked from 'marked';
import ConfirmModal from '../components/ConfirmModal'
import UpdateModal from '../components/UpdateModal'

export default {
    name: "MyNote",
    components: {
        ConfirmModal,
        UpdateModal
    },
    data() {
        return {
              note: null,
              showModal: false,
              updateModal: false
        }
    },
    methods: {
        deleteNote(){
            this.$store.dispatch("deleteNote", this.note.id).then((val)=>{
                this.showModal = false;
                this.$snackbar.showMessage({ content: "Ваша Запись Успешна Удалена"})
                this.$router.push('/mynotes')
            });
        }
    },
    computed: {
        compiledMarkdown(){
            return marked(this.note.note, {sanitize: true})
        }
    },
    created() {
        let id = this.$route.params.id
        this.note = this.$store.getters.getNote(this.$route.params.id);
        console.log(id);
    },
    
}
</script>

<style lang="scss" scoped>
    .single_note {
        box-shadow: 0 5px 10px 10px rgb(250, 250, 250);
        width: 70%;
        display: flex;
        flex-direction: column;
        margin: 2rem auto;
        padding: 1rem;
        border-radius: 5px;
        .tools {
            display: flex;
            padding: 1rem .4rem;
            justify-content: space-between;
            align-items: center;

            button {
                padding: .4rem .5rem;
                border: none;
                border-radius: 10px;
                color: #636363;
                background: #fafafa;
                font-size: 14px;
                cursor:pointer;
                box-shadow: 0 5px 10px 1px rgb(201, 201, 201);
                outline: none;
            
            &:nth-child(2){
                margin-left: .4rem;
                
                color: #f35b5b;
            }

            }

           
            
        }
        .note_footer{
            padding: 1rem .4rem;
             .shared_link {
                color: #bbb;
                font-size: 14px;
            }
        }
        .note_content {
            padding: 1rem .4rem;
        }
    }
    @media only screen and (max-width: 768px){
        .single_note {
        box-shadow: 0 5px 10px 10px rgb(250, 250, 250);
        width: 70%;
        display: flex;
        flex-direction: column;
        margin: 2rem auto;
        padding: 1rem;
        border-radius: 5px;
        .tools {
            display: flex;
            flex-direction: column;
            padding: 1rem .4rem;
            justify-content:flex-start;

            button {
                padding: .4rem .5rem;
                border: none;
                border-radius: 10px;
                color: #636363;
                background: #fafafa;
                font-size: 14px;
                cursor:pointer;
                box-shadow: 0 5px 10px 1px rgb(201, 201, 201);
                outline: none;
            
            &:nth-child(2){
                margin-left: .4rem;
                
                color: #f35b5b;
            }

            }

            .shared_link {
                color: #bbb;
                font-size: 12px;
            }
            
        }
        .note_content {
            padding: 1rem .4rem;
        }
    }
    }
</style>