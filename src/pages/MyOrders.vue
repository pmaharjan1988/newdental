<template>
  <q-page padding>
    <div class="text-h4">My Orders</div>
    <div class="row mtt-20" v-if="userOrders">
      <div
        class="col-md-6 col-sm-12 col-xs-12 q-pa-lg"
        v-for="(item,index) in userOrders"
        :key="index"
        style="margin:0 auto;"
      >
        <q-card>
          <q-card-section
            align="right"
            class="text-white shadow-20"
            :style="{ borderTop: `5px solid ${getRandomColor()}` , backgroundColor:getRandomColor() }"
          >
            <div class="row">
              <div class="text-h6 col-md-6 text-left">Order #{{ index + 1}}</div>
              <div class="text-body col-md-6">
                <div
                  class="text-weight-bold"
                  :class="[item.orderStatus.toUpperCase() === 'CONFIRM' ? 'txt-mat-success' : 'txt-mat-danger']"
                >Order :{{ item.orderStatus.toUpperCase() }}</div>
                <div
                  class="text-weight-bold"
                  :class="[item.paymentStatus.toUpperCase() === 'CONFIRM' ? 'txt-mat-success' : 'txt-mat-danger']"
                >Payment : {{ item.paymentStatus.toUpperCase() }}</div>
              </div>
            </div>
            <q-separator color="white" class="mtt-10 mbb-10" />

            <div class="text-subtitle2">
              <q-icon name="fas fa-clock" />
              :
              {{ item.orderDates.todaysDate| formatDate}}
            </div>
            <div class="text-subtitle2">
              <q-icon name="fas fa-shipping-fast" />
              :
              {{ item.orderDates.shippingDate| formatDate}}
            </div>
            <div class="text-subtitle2">
              <q-icon name="fas fa-box-open" />
              :
              {{ item.orderDates.startDeliveryDate| formatDate}} - {{ item.orderDates.endDeliveryDate| formatDate}}
            </div>
          </q-card-section>

          <q-card-section class="mtt-30" align="right">
            <div class="text-h5 text-weight-bolder">{{item.totalAmount}} A$</div>
            <div class="text-body text-grey">Items - {{item.totalItems}}</div>
          </q-card-section>

          <q-separator color="black" class="mtt-10 mbb-10" />

          <q-card-actions dark align="right">
            <q-btn @click="openAddressDetails(item.id)" flat>Address Details</q-btn>
            <q-btn flat @click="openOrderDetails(item.id)">Order Details</q-btn>
          </q-card-actions>
        </q-card>

        <q-dialog v-model="itemsDialog" position="bottom">
          <q-card class="q-pa-md card-top-border" style="width:500px;">
            <div class="q-pa-md">
              <div class="text-h5">Order Items</div>
              <q-separator class="mtt-20 mbb-20" inset color="primary" />
              <div class="q-pa-md">
                <q-list bordered separator>
                  <q-item clickable v-ripple v-for="(order,index) in items" :key="index">
                    <q-item-section avatar>
                      <q-icon name="fas fa-shopping-bag" color="accent" />
                    </q-item-section>
                    <q-item-section>{{order.name}}</q-item-section>
                    <q-item-section side>{{order.price}} A$</q-item-section>
                  </q-item>
                  <q-separator class="mtt-20 mbb-20" inset color="dark" />
                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="fas fa-dollar-sign" color="primary" />
                    </q-item-section>
                    <q-item-section>Total</q-item-section>
                    <q-item-section class="text-weight-bold" side>{{itemTotal}} A$</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="addressDialog" position="bottom">
          <q-card class="q-pa-md card-top-border">
            <div class="q-pa-md">
              <div class="text-h5">Delivering to this address</div>
              <q-separator class="mtt-20 mbb-20" inset color="primary" />
              <div class="q-pa-md">
                <div class="text-h5 text-primary">Name : {{deliveryAddress.name}}</div>
                <div class="text-h6">Mobile : {{deliveryAddress.mobile}}</div>
                <div class="text-h6">Address : {{deliveryAddress.address}}</div>
                <div class="text-h6">Landmark : {{deliveryAddress.landmark}}</div>
                <div class="text-h6">PostalCode : {{deliveryAddress.postalcode}}</div>
              </div>
            </div>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div class v-else>
      <div class="text-h5 text-center text-negative">No Orders available</div>
    </div>
  </q-page>
</template>
 
<script>
import { mapGetters } from "vuex";
import { format } from "date-fns";
import randomMC from "random-material-color";
var _ = require("lodash");
export default {
  name: "OrderPage",
  data() {
    return {
      loading: false,
      addressDialog: false,
      itemsDialog: false,
      itemTotal: 0,
      deliveryAddress: {
        name: "",
        mobile: "",
        address: "",
        landmark: "",
        postalcode: ""
      },
      items: [
        {
          id: "",
          name: "",
          price: ""
        }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      if (!value) return "";
      value = format(value.toDate(), "dd-MMM-yyyy HH:MM:SS");
      return value;
    }
  },
  computed: {
    ...mapGetters({
      userId: "global/getUserId",
      userOrders: "global/getUserOrders"
    })
  },
  mounted() {
    this.initOrders();
  },
  methods: {
    initOrders: async function() {
      await this.$store.dispatch("global/getUserOrders", this.userId);
    },
    getRandomColor: function() {
      return randomMC.getColor({ shades: ["800", "900"] });
    },
    openAddressDetails(id) {
      const orderObj = this.findOrderObj(id);
      const orderAddress = orderObj.deliveryAddress;
      this.deliveryAddress = orderAddress;
      this.addressDialog = !this.addressDialog;
    },
    openOrderDetails(id) {
      const orderObj = this.findOrderObj(id);
      const orderItems = orderObj.items;
      this.items = orderItems;
      const itemPriceArray = this.items.map(item => item.price);
      this.itemTotal = _.sum(itemPriceArray);
      this.itemsDialog = !this.itemsDialog;
    },
    findOrderObj(id) {
      const orderObj = this.userOrders.find(item => {
        return item.id === id;
      });
      return orderObj;
    }
  }
};
</script>
