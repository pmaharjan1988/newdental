<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <CheckoutItems />
      </div>
      <div class="col-md-6 col-sm-12 q-pa-lg">
        <q-card class="q-pa-md card-top-border">
          <div class="q-pa-md">
            <div class="text-h5">Deliever to this address</div>
            <q-separator class="mtt-20 mbb-20" inset color="primary" />
            <div class="q-pa-md">
              <div class="text-h6 text-primary">Name : {{address_form.name}}</div>
              <div class="text-h6">Mobile : {{address_form.mobile}}</div>
              <div class="text-h6">Adddress : {{address_form.address}}</div>
              <div class="text-h6">Landmark : {{address_form.landmark}}</div>
              <div class="text-h6">PostalCode : {{address_form.postalcode}}</div>
            </div>
          </div>
        </q-card>
        <div class="row full-width justify-end mtt-10">
          <q-btn color="primary" align="right" @click="proceedToPay()" size="1em">Pay Now</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
const shippingWidow = 5;
const stateDeliveryWindow = 10;
const endDeliveryWindow = 14;
import CheckoutItems from "../components/CheckoutItems.vue";
import { mapGetters } from "vuex";
import { firebaseStorage, firebaseAuth } from "boot/firebase";
import { LocalStorage, Notify } from "quasar";
import { format, addDays } from "date-fns";
export default {
  data() {
    return {
      address_form: {
        addressid: null,
        name: null,
        mobile: null,
        address: null,
        uid: null,
        postalcode: null,
        landmark: null
      },
      orderDates: null,
      address_data: null,
      address_id: null,
      loginStatus: false
    };
  },
  components: {
    CheckoutItems
  },
  mounted() {
    this.getUserId();
    this.initCheckLogin();
    this.getOrderDates();
    this.initSummary();
  },
  computed: {
    ...mapGetters({
      user: "global/user",
      userId: "global/getUserId",
      cart_total: "global/getProductTotal",
      cart_length: "global/getCartCount"
    })
  },
  methods: {
    getUserId() {
      const userId = this.user;
    },
    getOrderDates: function() {
      const today = new Date();
      const shippingDate = addDays(today, shippingWidow);
      const startDeliveryDate = addDays(today, stateDeliveryWindow);
      const endDeliveryDate = addDays(today, endDeliveryWindow);

      this.orderDates = {
        todaysDate: today,
        shippingDate: shippingDate,
        startDeliveryDate: startDeliveryDate,
        endDeliveryDate: endDeliveryDate,
        paramDate: null
      };

      this.$store.commit("global/SET_ORDER_DATES", this.orderDates);
    },

    proceedToPay() {
      this.getOrderDates();
      this.$router.push({
        name: "Payment"
      });
    },
    async initSummary() {
      const userId = this.userId;
      if (userId) {
        let address = await firebaseStorage.collection("address");
        let userAddress = address
          .where("uid", "==", userId)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              return;
            } else {
              snapshot.forEach(doc => {
                this.address_id = doc.id;
                let address_data = doc.data();
                this.address_form.addressid = doc.id;
                this.address_form.name = address_data.name;
                this.address_form.mobile = address_data.mobile;
                this.address_form.uid = address_data.uid;
                this.address_form.address = address_data.address;
                this.address_form.landmark = address_data.landmark;
                this.address_form.postalcode = address_data.postalcode;
                this.$store.commit("global/SET_ADDRESS", this.address_form);
              });
            }
          })
          .catch(err => {
            Notify.create({
              message: "Error in loading adddresses",
              color: "red"
            });
          });
      }
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
