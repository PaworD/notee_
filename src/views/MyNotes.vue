<template>
    <div id="mynotes" v-if="notes.length != 0">
       <Note v-for="note in notes" :key="note['id']" 
       noteName="note." 
       :content="note.note" 
       :created="note.created"
       :modified="note.modified" 
       :id="note.id" />
    </div>
    <div v-else>
        <div class="center">
            У вас нет Заметок
        </div> 
    </div>
</template>

<script>

import Note from "../components/Note";
//import Snackbar from '../components/Snackbar';

export default {
    components: {
        Note,
        //Snackbar
    },
    data() {
        return {
            notes: '',
        }
    },
    methods: {
        fetchNotes(){
            this.$store.dispatch("getAllNotes").then(() => {
                this.notes = this.$store.getters.getNotes;
            })
        }
    },
    created() {
        this.fetchNotes()
    },
}
</script>

<style lang="scss" scoped>
    #mynotes {
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;

    }
    .center {
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -60%);
        color: #bbb;
    }
    @media only screen and (max-width: 768px){
        #mynotes {
            flex-direction: column;
        }
    }
</style>