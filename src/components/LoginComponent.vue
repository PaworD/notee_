<template>
  <div id="app">
    <div class="login_box">
      <form v-if="!signupcomponent">
        <input type="text" v-model="user.login" placeholder="Логин" />
        <input type="password" v-model="user.password" placeholder="Пароль" />
        <span v-if="errorMsg" class="error">{{ errorMsg }}</span>
        <button @click="logIn($event)">Вход</button>
        <span @click="signupcomponent = true">Создать Аккаунт</span>
      </form>
      <form v-else>
        <input
          type="text"
          v-model="newuser.username"
          placeholder="Имя"
          required
        />
        <input
          type="text"
          v-model="newuser.lastname"
          placeholder="Фамилия"
          required
        />
        <input
          type="text"
          v-model="newuser.login"
          placeholder="Логин"
          required
        />
        <input
          type="password"
          v-model="newuser.password"
          placeholder="Пароль"
          required
        />
        <input
          type="password"
          @keyup="isValid()"
          v-model="checkPassword"
          placeholder="Повторите Пароль"
          required
        />
        <small class="error" v-if="isValid()">{{
          "Пароли не совпадают"
        }}</small>
        <button @click="signUp($event)">Зарегистрироваться</button>
        <span @click="signupcomponent = false">Вход в Аккаунт</span>
      </form>

      <img src="../assets/left_bg.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
      newuser: {
        username: "",
        lastname: "",
        login: "",
        password: "",
      },
      checkPassword: "",
      signupcomponent: false,
    };
  },
  methods: {
    logIn(e) {
      e.preventDefault();

      this.$store.dispatch("logIn", this.user).then((val) => {

        
      });
    },
    signUp(e) {
      e.preventDefault();

      this.$store.dispatch("signUp", this.newuser).then((val) => {
        this.$snackbar.showMessage({content: "Аккаунт Успешно Создан! Войдите"})
        
        this.signupcomponent = false;
      });
    },
    isValid() {
      if (this.newuser.password !== this.checkPassword) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    errorMsg() {
      return this.$store.getters.hasError;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #bbb;
  box-shadow: 0px 5px 10px 10px #ececec;
  border-radius: 20px;

  .login_box {
    display: flex;
    justify-content: stretch;

    .img_container {
      background: #000;
      flex: 70%;
    }
    img {
      width: 65%;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    form {
      flex: 30%;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: .8rem .7rem;
      input {
        transition: all 0.5s ease;
        margin: 0.7em 0 0.5em 0;
        padding: 0.8em 0.4em;
        outline: none;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 5px;
        box-shadow: 0px 2px 10px 1px #f1f1f1;
      }
      button {
        align-self: center;
        padding: 0.7em 1.2em;
        margin-top: 1rem;
        outline: none;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 11px;
        cursor: pointer;
      }
      input:focus {
        box-shadow: 0px 2px 10px 1px #b8e2f3;
      }

      span {
        margin: 1rem auto;
        align-self: center;
        color: rgb(109, 185, 160);
        cursor: pointer;
      }
      .error {
        font-size: 10px;
        color: #ff6565;
      }
    }
  }
  .error {
    color: #cf6b6b;
    font-size: 12px;
    margin-left: 1px;
  }
}
@media only screen and (max-width: 768px) {
  #app {
    width: 100%;
    .login_box {
      width: 100%;
      display: block;


      .img_container {
        display: none;
      }
      img {
        display: none;
      }
      form {
        flex: 100%;
        padding: 1rem;
        border-radius: 20px;
        input {
          transition: all 0.5s ease;
          margin: 0.7em 0 0.5em 0;
          padding: 1.2em 0.4em;
          outline: none;
          border: 1px solid rgb(221, 221, 221);
          border-radius: 5px;
          box-shadow: 0px 2px 10px 1px #f1f1f1;
        }
        button {
          align-self: center;
          padding: 0.7em 1.2em;
          margin-top: 1rem;
          outline: none;
          border: 1px solid rgb(221, 221, 221);
          border-radius: 5px;
          text-transform: uppercase;
          font-size: 11px;
          cursor: pointer;
        }
        input:focus {
          box-shadow: 0px 2px 10px 1px #b8e2f3;
        }

        span {
          margin: 1rem auto;
          align-self: center;
          color: rgb(109, 185, 160);
          cursor: pointer;
        }
        .error {
          font-size: 10px;
          color: #ff6565;
        }
      }
    }
    .error {
      color: #cf6b6b;
      font-size: 12px;
      margin-left: 1px;
    }
  }
}
</style>