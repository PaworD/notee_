<template>
    <div class="create_block">
        <div class="tools">
            <div class="markup">

            <div @click="createBold()">B</div>
            <div @click="createItalic()">I</div>
            <div>U</div>

            </div>
            
            <div class="actions">

            <button @click="toggleRaw()">
               <span v-if="showRaw">Превью</span>
                      <span v-else>Текст</span>
            </button>
            
            <button @click="createNote()">
                Сохранить
            </button>
            </div>
        </div>
        <div class="content">
            <textarea v-if="showRaw" placeholder="Печатайте Здесь..." :value="input" @input="update($event)" maxlength="1000">

            </textarea>
            <div v-else class="markedHtml" v-html="compiledMarkdown">

            </div>
        </div>
        <div class="footer">
           
        </div>
    </div>
</template>


<script>

import marked from 'marked';

export default {
    data() {
        return {
            
            input: "# Моя Заметка",
            showRaw: true
        }
    },

    computed: {
        compiledMarkdown(){
            return marked(this.input, {sanitize: true})
        }
    },
    methods: {
        createNote(){
            this.$store.dispatch("createNote", {
                note: this.input,
                created: new Date()
            }).then((val) => {
               this.$snackbar.showMessage({ content: val})
                this.$router.push('/mynotes')
            })
        },
        update(e){
            this.input = e.target.value
        },
        toggleRaw(e){
            this.showRaw = !this.showRaw;
            console.log(this.compiledMarkdown);
        },
        createBold(){
            this.input = this.input + "**Ваш текст на Жирном** "
        },
         createItalic(){
            this.input = this.input + "_Ваш текст на Курсивом_ "
        }
    },
}
</script>

<style lang="scss" scoped>
    .create_block {
        width: 85%;
        margin: 2rem auto;
        display: block;
        box-shadow: 0px 5px 10px 10px #fafafa;
        border-radius: 10px;
        padding: 1rem;

        .tools {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem;
            align-items: center;


            .markup {
                display: flex;
                gap: 10px;


                div{
                    transition: all .2s ease-in;
                    width: 15px;
                    height: 15px;
                    padding: .3rem .3rem;
                    text-align: center;
                    background: #fafafa;
                    color: #5ACF97;
                    border: 1px solid #5ACF97;
                    border-radius: 5px;
                    cursor:pointer;

                    &:hover {
                    background: #5ACF97;
                    color: #fafafa;
                    }

                }
            }
            .actions {
            button {
                border: 0;
                outline: none;
                padding: .6rem 1rem;
                border-radius: 10px;
                background:  rgb(255, 255, 255);
                color: #5ACF97;
                border: 1px solid #5ACF97;
                cursor: pointer;
            
                &:nth-child(1) {
                margin-right: 10px;;
            }

            }
            }
        }

        .content {
            textarea {
                transition: all .3s ease;
                display: block;
                width: 90%;
                height: 250px;
                resize: none;
                border: none;
                border-left : 2px solid rgb(240, 240, 240);
                padding: 1rem;
                outline:none;
                margin: 1rem auto;


                &:focus {
                     border-left : 2px solid#5ACF97;
                }
            }

            .markedHtml {
                display: block;
                width: 90%;
                resize: none;
                border: none;
                border-left : 2px solid rgb(240, 240, 240);
                padding: 1rem;
                outline:none;
                margin: 1rem auto;


                &:focus {
                     border-left : 2px solid rgb(74, 219, 238);
                }
            }
        }

        .footer {
            display: flex;
            justify-content: flex-end;

            div span:first-child {
                color: #ccc;
                margin-right: 10px;
                font-size: 14px;
            }
            div span:nth-child(2) {
                color: rgb(145, 145, 145);
                margin-right: 10px;
                font-size: 14px;
            }
        }
    }
</style>