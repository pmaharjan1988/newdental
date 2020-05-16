<template>
  <div>
    <q-btn
      class="desk-nav-items"
      stretch
      flat
      v-for="(item) in alwaysbaritems"
      :key="item.label"
      :label="item.label"
      :to="item.to"
    />
    <q-btn
      v-if="loginStatus == false"
      class="desk-nav-items"
      stretch
      flat
      v-for="(item,index) in loginbaritems"
      :key="item.label"
      :label="item.label"
      :to="item.to"
    />
    <q-btn
      v-if="loginStatus == true"
      class="desk-nav-items"
      stretch
      flat
      v-for="(item,index) in logoutbaritems"
      :key="item.label"
      :label="item.label"
      :to="item.to"
    />
    <q-btn
      v-if="loginStatus == true"
      class="desk-nav-items"
      label="Logout"
      stretch
      flat
      @click="logout()"
    />
    <q-btn class="mob-nav-items" icon="fas fa-bars">
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup v-for="(item,index) in alwaysbaritems" :key="item.label">
            <q-item-section>
              <q-btn stretch flat :label="item.label" :to="item.to" color="primary" />
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            v-if="loginStatus == false"
            v-for="(item,index) in loginbaritems"
            :key="item.label"
          >
            <q-item-section>
              <q-btn stretch flat :label="item.label" :to="item.to" color="primary" />
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            v-if="loginStatus == true"
            v-for="(item,index) in logoutbaritems"
            :key="item.label"
          >
            <q-item-section>
              <q-btn stretch flat :label="item.label" :to="item.to" color="primary" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup v-if="loginStatus == true">
            <q-item-section>
              <q-btn
                class="mob-nav-items"
                color="primary"
                label="Logout"
                stretch
                flat
                @click="logout()"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { firebaseAuth, firebaseStorage } from "boot/firebase";
import { LocalStorage, Notify } from "quasar";

export default {
  data() {
    return {
      appName: null,
      loginStatus: false,
      alwaysbaritems: [
        {
          label: "Home",
          to: "/",
          icon: ""
        },
        {
          label: "About Us",
          to: "/about",
          icon: ""
        },
        {
          label: "Products",
          to: "/products",
          icon: ""
        },
        {
          label: "Contact",
          to: "/contact",
          icon: ""
        }
        /*{
          label: "Terms",
          to: "/terms",
          icon: ""
        }*/
      ],
      loginbaritems: [
        {
          label: "Login",
          to: "/login",
          icon: ""
        },
        {
          label: "register",
          to: "/register",
          icon: ""
        }
      ],
      logoutbaritems: [
        {
          label: "Dashboard",
          to: "/dashboard",
          icon: ""
        }
      ]
    };
  },
  created() {
    this.initCheckLogin();
  },
  methods: {
    initCheckLogin: function() {
      let x = this.$store.dispatch("global/checkUserState");
      this.storageUser = LocalStorage.getItem("STORAGEUSER");
      console.log("my storage", this.storageUser);

      if (this.storageUser == false || this.storageUser === null) {
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
      }
    },
    async logout() {
      await this.$store.dispatch("global/setEmptyUserOrders");

      LocalStorage.remove("STORAGEUSER");
      firebaseAuth.signOut().then(() => {
        this.$router.replace({
          name: "Login"
        });
        this.initCheckLogin();
      });
    }
  }
};
</script>
