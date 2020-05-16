<template>
  <div>
    <div class="q-pa-xl mtt-50">
      <div class="q-pa-md text-center text-h2">Products</div>
      <div class="text-center text-grey text-body1 mbb-30">Select from our large number of products</div>
      <div style="width:100%;height:400px;position: relative;">
        <!-- Using the slider component -->
        <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem
            v-for="(item,index) in slider_products"
            :key="index"
            :style="item.style"
            @tap="openProduct(item.id)"
            style="cursor:pointer"
          >
            <div
              style="position:absolute; bottom:0px; width:95% !important;font-size: 0.8em !important; word-wrap: break-word;white-space: pre-line; padding:5px; color:#c3d9de;background-color: rgba(0, 0, 0, .3) !important;"
            >{{item.name}}</div>
          </slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
    </div>
  </div>
</template>
<script>
// import slider components
import { slider, slideritem } from "vue-concise-slider";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      options: {
        currentPage: 0,
        infinite: 1,
        loop: true,
        loopedSlides: 1,
        autoplay: 4000
      },
      slider_products: [],
      slider_products_mobile: []
    };
  },

  created() {
    this.initProducts();
  },
  computed: {
    ...mapGetters({
      products_data: "global/getAllProductData" // map `this.add()` to `this.$store.dispatch('increment')`
    })
  },
  methods: {
    initProducts: async function() {
      await this.$store.dispatch("global/getAllProducts");
      let sliderProducts = [];
      let sliderProductsMobile = [];

      this.products_data.forEach(function(value, i) {
        sliderProducts[i] = {
          id: value.id,
          name: value.name,
          style:
            "display:flex;background-image:url(" +
            value.thumb_img +
            ");width:40%;margin-right:2%;"
        };

        sliderProductsMobile[i] = {
          id: value.id,
          name: value.name,
          style:
            "display:flex;background-image:url(" +
            value.thumb_img +
            ");width:100%;margin-right:2%;"
        };
      });

      this.slider_products = sliderProducts;
      this.slider_products_mobile = sliderProductsMobile;
    },
    openProduct: function(id) {
      console.log(id);
      this.$router.push({
        name: "OpenProduct",
        params: {
          id: id
        }
      });
    }
  },
  components: {
    slider,
    slideritem
  }
};
</script>
