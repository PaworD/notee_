<template>
    <div>
        <transition name="modal">
            <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-default-button" @click="$emit('close')">
                    Отмена
                  </button>
                  <button class="modal-default-button" @click="$emit('confirm')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        </transition>
    </div>
</template>


<script>
export default {
    name : "ConfirmModal",
    data() {
        return {
            
        }
    },
}
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
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px 1px rgb(240, 240, 240);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-default-button {
  border: none;
  outline: none;
  background: rgb(248, 115, 115);
  color: #fafafa;
  border-radius: 5px;
  padding: .4rem .8rem;
  cursor: pointer;

  &:nth-child(1){
    margin-right: 0.4rem;
    background: rgb(224, 224, 224);
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