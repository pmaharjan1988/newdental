<template>
  <q-page padding>
    <div class="row">
      <q-input
        class="col-12"
        filled
        v-model="searchText"
        placeholder="Search Products"
        @keyup="searchProducts()"
      >
        <template v-slot:prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>
    <div class="row mtt-20" v-if="filterProductData.length > 0">
      <div
        class="col-md-4 col-sm-12 col-xs-12 q-pa-lg"
        style="margin:0 auto;"
        v-for="(item,index) in filterProductData"
        :key="index"
      >
        <q-card bordered class="shadow-20 flex" style="width: 100%;height:100%">
          <img
            v-img:spimg
            :src="item.thumb_img"
            style="width: 100%;height:200px;margin-bottom:0 !important"
            :alt="item.name"
          />
          <q-card-section class="q-pt-md w-100">
            <div class="text-h6">{{item.name}}</div>
            <div class="text-caption text-grey" v-html="item.desc.substr(0,12)"></div>
            <div class="text-h5 text-bold text-right">A$ {{item.price}}</div>
            <div
              class="full-width row justify-end mtt-10 mbb-10"
              style="border-top: 1px solid grey"
            >
              <q-btn
                class="mtt-10 mbb-10"
                flat
                icon="shopping_cart"
                color="primary"
                @click="addToCart(item)"
              >Add to Cart</q-btn>
              <q-btn
                flat
                class="mtt-10 mbb-10"
                icon="description"
                color="primary"
                @click="openProduct(item.id)"
              >Know More</q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="text-center text-h4 text-primary mtt-20">No products found</div>
  </q-page>
</template>
<script>
import { firebaseStorage } from "boot/firebase";
import { mapGetters } from "vuex";
import { Notify } from "quasar";

export default {
  data() {
    return {
      searchText: null,
      filterProductData: []
    };
  },
  computed: {
    ...mapGetters({
      products_data: "global/getAllProductData" // map `this.add()` to `this.$store.dispatch('increment')`
    })
  },
  mounted() {
    this.initProducts();
  },
  methods: {
    searchProducts: function() {
      let text = this.searchText.toUpperCase();

      const searchData = this.products_data.filter(item => {
        return item.name.indexOf(text) !== -1;
      });

      this.filterProductData = searchData;
    },
    initProducts: async function() {
      await this.$store.dispatch("global/getAllProducts");
      this.filterProductData = this.products_data;
    },
    openProduct: function(id) {
      this.$router.push({
        name: "OpenProduct",
        params: {
          id: id
        }
      });
    },

    addToCart: function(item) {
      let productId = item.id;
      let productName = item.name;
      let productPrice = parseFloat(item.price);

      let productItem = {
        id: productId,
        name: productName,
        price: productPrice
      };

      this.$store.commit("global/SET_TO_CART", productItem);

      Notify.create({
        message: "Product added to cart",
        color: "green"
      });
    }
  }
};
</script>
