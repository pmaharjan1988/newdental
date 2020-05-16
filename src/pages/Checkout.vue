<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-6 col-sm-12 q-pa-md">
        <CheckoutItems />
      </div>
      <div class="col-md-6 col-sm-12">
        <div v-if="!loginStatus">
          <div class="q-pa-md row full-width justify-center">
            <div class="text-h4 text-negative">You are not Logged In</div>
          </div>
          <div class="q-pa-md row full-width justify-center">
            <q-btn color="primary" @click="checkoutLogin()" size="lg">Login</q-btn>
          </div>
        </div>
        <div v-else>
          <div class="q-pa-md row full-width justify-center">
            <div class="q-pa-md row full-width">
              <div class="text-h5">
                Hello {{user.data.displayName}} ,
                <br />
                <div style="font-size: 16px !important">You have {{cart_length}} items in your Bag.</div>
              </div>
            </div>
            <q-btn color="primary" to="/address" size="lg">Proceed A$ {{cart_total}}</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import CheckoutItems from "../components/CheckoutItems.vue";
import { mapGetters } from "vuex";

import { LocalStorage, Notify } from "quasar";
export default {
  components: {
    CheckoutItems
  },
  mounted() {
    this.initCheckLogin();
  },
  computed: {
    ...mapGetters({
      cart_total: "global/getProductTotal",
      cart_length: "global/getCartCount",
      user: "global/user"
    })
  },
  data() {
    return {
      loginStatus: false
    };
  },
  methods: {
    checkoutLogin: function() {
      this.$store.commit("global/SET_LOGGIN_NAVIGATION", "FROM_CHECKOUT");
      this.$router.replace({
        name: "Login"
      });
    },
    initCheckLogin: function() {
      let x = this.$store.dispatch("global/checkUserState");
      this.storageUser = LocalStorage.getItem("STORAGEUSER");
      console.log(this.storageUser);

      if (this.storageUser == false) {
        this.loginStatus = false;
      } else {
        this.loginStatus = true;
      }
    }
  }
};
</script>
