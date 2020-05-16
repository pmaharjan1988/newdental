<template>
  <q-page padding>
    <div class="row mtt-40">
      <div class="col-6 q-pa-md">
        <q-card bordered class="shadow-20">
          <q-card-section class="q-pt-md w-100">
            <img v-img:spimg :src="products_data.thumb_img" style="width: 100%;height:50vh;margin-bottom:0 !important" :alt="products_data.name">
            <div class="text-h5 text-bold text-right">
              A$ {{products_data.price}}
            </div>
            <div class=" full-width row justify-end mtt-10" style="border-top: 1px solid grey">
              <q-btn class="mtt-10" icon="shopping_cart" color="primary" @click="addToCart(products_data)">
                Add to Cart
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 q-pa-md">
        <div class="text-h4">{{products_data.name}}</div>
        <div class="text-body mtt-20" v-html="products_data.desc"></div>
      </div>
    </div>
  </q-page>
</template>
<script>
import
{
  mapGetters,
}
from 'vuex'
export default
{
  data()
  {
    return {

      product_id: this.$route.params.id.trim(),

    }
  },
  computed:
  {
    ...mapGetters(
    {
      products_data: 'global/getSingleProductData' // map `this.add()` to `this.$store.dispatch('increment')`
    })

  },
  created()
  {
    this.initProducts();
  },
  methods:
  {
    initProducts: async function()
    {
      await this.$store.dispatch('global/getSingleProduct', this.product_id)
    },
    addToCart: function(item)
    {

      let productId = item.id;
      let productName = item.name;
      let productPrice = parseFloat(item.price);

      let productItem = {
        'id': productId,
        'name': productName,
        'price': productPrice
      };

      this.$store.commit('global/SET_TO_CART', productItem);


    }
  }
}

</script>
