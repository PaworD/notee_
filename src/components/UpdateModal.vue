<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
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
                  <button @click="$emit('close')">
                    Отмена
                  </button>
                  <button @click="updateNote()">Сохранить</button>
                </div>
              </div>
              <div class="content">
                <textarea
                  v-if="showRaw"
                  placeholder="Печатайте Здесь..."
                  v-model="editedNote"
                  maxlength="1000"
                >
                </textarea>
                <div v-else class="markedHtml" v-html="compiledMarkdown"></div>
              </div>
              <div class="footer"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import marked from 'marked';
export default {
  name: "UpdateModal",
  props: {
    note: {
      type: Object,
      required: true,
        
    },
  },
  data() {
    return {
         showRaw : false,
         editedNote : null
    };
  },
  created() {
      this.editedNote = this.note.note;
  },
  methods: {
      updateNote(){
          this.$store.dispatch("updateNote", {
              id: this.note.id,
              note: this.editedNote,
              modified: new Date()
          }).then((val) => {
              this.$snackbar.showMessage({content: "Ваша Запись Успешна Обновлена"})
              this.$emit("close");
          })
      },
      toggleRaw(e){
            this.showRaw = !this.showRaw;
        },
      createBold(){
            this.editedNote = this.editedNote + "**Ваш текст на Жирном** "
        },
         createItalic(){
            this.editedNote = this.editedNote + "_Ваш текст на Курсивом_ "
        }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.editedNote, { sanitize: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(201, 201, 201, 0.315);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  height: 70%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.create_block {
  width: 100%;
  height: 100%;
  margin: 2rem auto;
  display: block;
  box-shadow: 0px 5px 10px 2px #fafafa;
  border-radius: 10px;

  .tools {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;

    .markup {
      display: flex;
      gap: 10px;

      div {
        transition: all 0.2s ease-in;
        width: 15px;
        height: 15px;
        padding: 0.3rem 0.3rem;
        text-align: center;
        background: #fafafa;
        color:#5ACF97;
        border: 1px solid #5ACF97;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background:#5ACF97;
          color: #fafafa;
        }
      }
    }
    .actions {
      button {
        border: 0;
        outline: none;
        padding: 0.6rem 1rem;
        border-radius: 10px;
        background: rgb(255, 255, 255);
        color: #5ACF97;
        border: 1px solid#5ACF97;
        cursor: pointer;

        &:nth-child(1) {
          margin-right: 10px;
        }
         &:nth-child(2) {
          margin-right: 10px;
        }
      }
    }
  }

  .content {
    textarea {
      transition: all 0.3s ease;
      display: block;
      width: 90%;
      height: 170px;
      resize: none;
      border: none;
      border-left: 2px solid rgb(240, 240, 240);
      padding: 1rem;
      outline: none;
      margin: 1rem auto;

      &:focus {
        border-left: 2px solid #5ACF97;
      }
    }

    .markedHtml {
      display: block;
      width: 90%;
      resize: none;
      border: none;
      border-left: 2px solid rgb(240, 240, 240);
      padding: 1rem;
      outline: none;
      margin: 1rem auto;

      &:focus {
        border-left: 2px solid rgb(74, 219, 238);
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>