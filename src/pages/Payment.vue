<template>
  <q-page padding>
    <div class="row justify-center">
      <div class style="width:400px">
        <CheckoutItems />
        <div ref="paypal"></div>
      </div>
    </div>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{dialogTitle}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{dialogText}}</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="navigateTo(dialogNavigate)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- <q-btn color="primary" align="right" :loading="loading" @click="doPayment()" size="1em">Pay</q-btn> -->
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { firebaseStorage, firebaseAuth } from "boot/firebase";
import { Notify } from "quasar";
import { format, formatDistance } from "date-fns";
import CheckoutItems from "../components/CheckoutItems.vue";
export default {
  data() {
    return {
      order: null,
      loading: false,
      orderId: null,
      paypalObject: null,
      dialogTitle: "",
      dialogText: "",
      dialogNavigate: "",
      alert: false
    };
  },
  components: {
    CheckoutItems
  },
  mounted() {
    this.preparePayPalData();
    console.log(this.paypalObject);
    this.paypalSdk();
  },
  created() {},
  computed: {
    ...mapGetters({
      cartItems: "global/getCartItems",
      cartLength: "global/getCartCount",
      cartTotal: "global/getProductTotal",
      userId: "global/getUserId",
      address: "global/getAddress",
      orderDates: "global/getOrderDates"
    })
  },
  methods: {
    doPayment: function() {
      console.log("cartItems", this.cartItems);
      console.log("cartLength", this.cartLength);
      console.log("cartTotal", this.cartTotal);
      console.log("userId", this.userId);
      console.log("address", this.address);
      console.log("orderdates", this.orderDates);
      this.submitOrder();
    },
    preparePayPalData: function() {
      this.orderId = "order" + Math.floor(Math.random() * 90000) + 10000;
      const paypalObject = {
        description: `Shipping ${this.cartLength} items to ${this.address.name}`,
        custom_id: this.orderId,
        amount: {
          value: this.cartTotal,
          currency_code: "AUD"
        },

        shipping: {
          method: "Dental Warehouse Shipping service",
          address: {
            name: {
              full_name: "Red"
            },
            address_line_1: this.address.address,
            address_line_2: "Australia",
            admin_area_2: "AU",
            admin_area_1: "Postal Code",
            postal_code: this.address.postalcode,
            country_code: "AU"
          }
        }
      };
      this.paypalObject = paypalObject;
      console.log("created -> paypalObject", paypalObject);
    },
    paypalSdk: function() {
      paypal_sdk
        .Buttons({
          createOrder: (data, actions) => {
            this.$q.loading.show({
              message:
                '<span class="text-positive">Processing your payment. <br/><span class="">Hang on...</span></span>'
            });
            return actions.order.create({
              purchase_units: [this.paypalObject]
            });
          },
          onApprove: (data, actions) => {
            actions.order.capture().then(details => {
              this.submitOrder(
                this.orderId,
                details.purchase_units[0].payments.captures[0].id,
                "confirm",
                "confirm"
              );

              this.showDialog(
                "Thank you",
                "Your Order has beed confirmed, click OK for more details",
                "Orders"
              );
            });
          },
          onCancel: (data, action) => {
            this.submitOrder(this.orderId, "", "cancel", "cancel");
            return this.showDialog(
              "Sorry",
              "Your Payment Failed, click OK to reorder",
              "products"
            );
          },
          onError: error => {
            console.log("dfsd");
            this.showDialog(
              "Sorry",
              "Something went wrong, click OK to reorder",
              "products"
            );
          }
        })
        .render(this.$refs.paypal);
    },
    showDialog(title, body, nav) {
      this.$q.loading.hide();
      this.dialogTitle = title;
      this.dialogText = body;
      this.dialogNavigate = nav;
      this.alert = true;
    },
    navigateTo(nav) {
      this.$router.push({
        name: nav
      });
    },
    submitOrder(orderId, transactionID, paymentStatus, orderStatus) {
      this.order = {
        id: orderId,
        userId: this.userId,
        transactionID,
        paymentStatus,
        orderStatus,
        totalAmount: this.cartTotal,
        totalItems: this.cartLength,
        items: this.cartItems,
        deliveryAddress: this.address,
        orderDates: this.orderDates,
        param1: null,
        param2: null
      };

      this.loading = true;
      firebaseStorage
        .collection("orders")
        .doc(orderId)
        .set(this.order)
        .then(() => {
          Notify.create({
            message: "Order Added Successfully",
            color: "green"
          });
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          Notify.create({
            message: "Error in placing saving",
            color: "red"
          });
          this.loading = false;
        });
    }
  }
};
</script>
