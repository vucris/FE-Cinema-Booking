<template>
  <div id="app">
    <Header />
    <router-view />
    <LoginModal/>
    <History/>
    <Register/>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import LoginModal from "./views/login/login.vue"; // ✅ Import modal
import Register from "./views/login/register.vue";
import infoUser from "./views/user/infoUser.vue";
import History from "./views/user/History.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',  
  components: {
    Header,
    LoginModal, // ✅ Thêm vào components
    Register,
    infoUser,
    History,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 0px;
}
</style>
