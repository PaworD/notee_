<template>
  <div id="homepage">
    <div class="sidebar">
      <div class="sidebar_userinfo">
        <p>{{user.username}}</p>
        <p>{{user.lastname}}</p>
      </div>
      <div class="sidebar_menu">
        <ul>
          <li>
            <router-link to="/mynotes/create">Создать Заметку</router-link>
          </li>
          <li>
            <router-link to="/mynotes">Мои Заметки</router-link>
          </li>
        </ul>
      </div>
      <div class="sidebar_options">
        <button class="log_out" @click="logout()">Выйти</button>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut").then(() => {
  this.$router.push("/login")
      });
    
    },
  },
  computed : {
    user(){
      return this.$store.getters.userData
    }
  }
};
</script>

<style lang="scss" scoped>
#homepage {
  display: flex;
  flex-direction: row;

  height: 100vh;
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 20%;
    background-color: #5ACF97;
    padding: 0.2rem 0.4rem;

    .sidebar_userinfo {
      flex: 20%;
      display: flex;
      padding: 0.2rem;
      justify-content: center;
      flex-direction: column;

      p {
        font-size: 17px;
      }
    }

    .sidebar_menu {
      flex: 70%;
      width: 100%;
      ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0.2rem 0;

        li {
         

          a {
            transition: all 0.1s ease-in;
            margin-top: 0.1rem;
            list-style: none;
            padding: 0.7rem 0.5rem;
            border-radius: 10px;
            cursor: pointer;
            display: block;
            text-decoration: none;
            color: #fafafa;

             &:hover  {
            color: #3e3e3e;
            background: #fafafa;
          }
          }
        }
      }
    }
    .sidebar_options {
      align-self: center;
      padding: 1rem 0;
      height: auto;

      .log_out {
        background: #f3f3f3;
        border: 0;
        outline: none;
        padding: 0.5rem 0.7rem;
        border-radius: 20px;
      }
    }
  }

  .content {
    flex: 90%;
    overflow-y: scroll;
  }
}
@media only screen and (max-width: 768px){
  #homepage{
    flex-direction: column;
     display: flex;
     .sidebar {
       flex: 5%;
      flex-direction: row;
      align-items: center;
        
      .sidebar_userinfo {
      flex: 10%;
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        font-size: 1.1rem;
      }
    }

    .sidebar_menu {
      flex: 40%;
      ul {
        display: flex;
        flex-direction: row;

        li {
          
          list-style: none;
          a {
            display: inline;
            transition: all 0.1s ease-in;
            cursor: pointer;
            text-decoration: none;
            color: #fafafa;
          }
        }
      }
    }
    .sidebar_options {
      align-self: center;
      padding: 1rem 0;
      
      .log_out {
        background: #f3f3f3;
        border: 0;
        outline: none;
        padding: 0.5rem 0.7rem;
        border-radius: 20px;
      }
    }
  }
  }

  .content {
    flex: 95%;
    overflow-y: scroll;
  }
  }
        
    
</style>