<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-avatar square style="width:80px;padding-left:10px;">
          <img src="statics/logo.jpg" />
        </q-avatar>
        <q-toolbar-title>
          <q-btn stretch class="app-name" flat size="0.9em" :label="appName" to="/" />
        </q-toolbar-title>
        <NavBarItems />
        <CartButton />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-list v-for="(menuItem, index) in menuList" :key="index">
        <q-item clickable :to="menuItem.path" v-ripple>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" :color="menuItem.color" />
          </q-item-section>
          <q-item-section>{{ menuItem.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { firebaseAuth } from "boot/firebase";
import BackToTop from "vue-backtotop";
import CartButton from "../components/CartButton.vue";
import NavBarItems from "../components/NavBarItems.vue";

import { LocalStorage, Notify } from "quasar";

export default {
  components: {
    BackToTop,
    CartButton,
    NavBarItems
  },
  data() {
    return {
      appName: null,
      drawer: true,
      storageUser: null,
      menuList: [
        {
          label: "Home",
          path: "/dashboard",
          icon: "fas fa-home",
          color: "secondary"
        },
        {
          label: "My Orders",
          path: "/myorders",
          icon: "fas fa-shopping-bag",
          color: "accent"
        },
        {
          label: "My Account",
          path: "/myaccount",
          color: "info",
          icon: "fas fa-user-circle"
        }
      ]
    };
  },

  mounted() {
    this.appName = process.env.APP_NAME;
  }
};
</script>
