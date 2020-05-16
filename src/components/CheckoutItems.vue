<template>
  <div class="q-pa-lg">
    <q-card class="q-pa-md">
      <div class="row full-width justify-center">
        <q-btn class="text-grey" flat size="2em" icon="shopping_cart">Your Items </q-btn>
      </div>
      <q-separator class="mtt-20 mbb-20" inset color="grey" />
      <div v-if="cart_length > 0">
        <div v-for="(item,index) in cart_items" :key="index">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-avatar color="primary" text-color="white">{{index+1}}</q-avatar>
              <q-item-section class="q-pa-sm text-body fw-500">{{item.name}}</q-item-section>
              <q-item-section side class="text-h6">{{item.price}} A$</q-item-section>
              <q-item-section side>
                <q-btn color="negative" flat dense size="md" icon="delete" @click="deleteProduct(item.id)" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="text-right text-primary text-bold text-h4 mtt-20">
          {{cart_total}} A$
        </div>
      </div>
      <div v-else class="text-grey text-center text-h5">
        You cart is empty
        <q-btn color="primary" to="/products"> Add Products</q-btn>
      </div>
    </q-card>
  </div>
</template>
<script>
import
{
  mapGetters,
  mapActions,
  mapMutations
}
from 'vuex'
export default
{
  name: 'CartItems',
  data()
  {
    return {

    }
  },
  computed:
  {
    ...mapGetters(
    {
      cart_items: "global/getCartItems",
      cart_length: "global/getCartCount",
      cart_total: "global/getProductTotal"
    })
  },
  mounted()
  {
    console.log(this.cart_items);
  },
  methods:
  {
    deleteProduct: function(id)
    {
      this.$store.commit('global/DELETE_FROM_CART', id);
    }
  }
}

</script>
