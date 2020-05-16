<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" style="padding-left:10px;" @click="left = !left" />
        <q-avatar square style="width:80px;">
          <img src="statics/logo.jpg" />
        </q-avatar>
        <q-toolbar-title>
          <q-btn stretch class="app-name" flat size="0.9em" :label="appName" to="/" />
        </q-toolbar-title>
        <q-btn stretch flat label="LogOut" @click="logout()" />
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple v-for="(item,index) in draweritems" :key="index" :to="item.to">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { firebaseAuth } from "boot/firebase";
import { mapGetters } from "vuex";
import BackToTop from "vue-backtotop";
import { LocalStorage } from "quasar";
import { Notify } from "quasar";

export default {
  components: {
    BackToTop
  },
  data() {
    return {
      left: false,
      appName: null,
      storageUser: null,
      draweritems: [
        {
          label: "Dashboard",
          to: "/admin/dashboard",
          icon: "fas fa-home"
        },
        {
          label: "Add Product",
          to: "/admin/addproduct",
          icon: "fas fa-images"
        },
        {
          label: "Enquiry",
          to: "/admin/enquiry",
          icon: "fas fa-headset"
        },
        {
          label: "Orders",
          to: "/admin/orderlist",
          icon: "fas fa-shopping-cart"
        },
        {
          label: "Users",
          to: "/admin/userslist",
          icon: "fas fa-users"
        },
        {
          label: "Forgot Password Request",
          to: "/admin/fpr",
          icon: "fas fa-unlock"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "global/user"
    })
  },
  mounted() {
    this.appName = process.env.APP_NAME;
  },
  updated() {
    this.initCheckLogin();
  },
  methods: {
    async initCheckLogin() {
      let x = await this.$store.dispatch("global/checkUserState");
      this.storageUser = LocalStorage.getItem("STORAGEUSER");
      console.log(this.storageUser);
      console.log("user logiginn: " + this.user.loggedIn);
      if (this.storageUser == false) {
        Notify.create({
          message: "You are logged out. Please login.",
          color: "red"
        });

        this.$router.push({
          name: "Login"
        });
      }
    },
    logout() {
      LocalStorage.remove("STORAGEUSER");
      firebaseAuth.signOut().then(() => {
        this.$router.replace({
          name: "Login"
        });
      });
    }
  }
};
</script>
