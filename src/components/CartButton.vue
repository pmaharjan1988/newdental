<template>
  <q-btn dense style="background: #FF0080; color: white" round icon="shopping_cart">
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div v-if="cart_total == 0">
            <q-list style="max-height: 200px;min-width: auto;">
              <q-item>
                <div class="text-center text-grey text-h6">
                  Cart is empty
                </div>
              </q-item>
            </q-list>
          </div>
          <q-list style="max-height: 200px;min-width: auto;">
            <q-item clickable v-for="(item,index) in cart_items" :key="index">
              <q-item-section>
                {{item.name}}
              </q-item-section>
              <q-item-section side>
                <q-item-label>A$ - {{item.price}}
                  <q-btn color="negative" flat dense size="md" icon="delete" @click="deleteProduct(item.id)" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator vertical inset class="q-ma-lg" />
        <div class="column items-center">
          <div class="text-subtitle1 text-grey q-mt-md q-mb-xs">Total </div>
          <div class="text-h5">A$</div>
          <div class="text-h5">{{cart_total}}</div>
          <div v-if="cart_total > 0">
            <q-btn class="mtt-20" color="primary" label="Checkout" push size="md" to="/checkout" />
          </div>
        </div>
      </div>
    </q-menu>
    <q-badge color="dark" floating>{{cart_length}}</q-badge>
  </q-btn>
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
  name: 'CardButton',

  data()
  {
    return {}
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
