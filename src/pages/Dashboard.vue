<template>
  <q-page padding>
    <div class="text-h5 text-dark">
      Welcome
      <span class="text-primary">{{user.data.displayName}},</span>
    </div>
    <div class="text-dark text-h6">You can proceed by selecting products from below.</div>
    <div>
      <AllProducts />
    </div>
  </q-page>
</template>
<script>
import AllProducts from "../components/AllProducts.vue";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    AllProducts
  },
  computed: {
    ...mapGetters({
      user: "global/user"
    })
  }
};
</script>
