<template>
  <q-page>
    <Carosuel />
    <ProductMain />
    <WhyUs />
    <AboutUs />
    <ContactUs />
    <EnquiryForm />
    <div reveal elevated class="bg-white q-footer-f">
      <div class="row d-flex justify-between">
        <div class="bg-primary q-pa-md text-center text-white">All Rights Reserved - {{ appName }}</div>
        <div class="mrr-40 mt-10">
          <q-icon
            class="text-primary q-pl-md q-ma-sm cursor-pointer"
            v-for="(item, index) in socialIcons"
            :key="index"
            size="20px"
            :name="item.icon"
            @click="openSocialLinks(item.link)"
          ></q-icon>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import Carosuel from "../components/Carosuel.vue";
import ProductMain from "../components/ProductMain.vue";
import ContactUs from "../components/ContactUs.vue";
import AboutUs from "../components/AboutUs.vue";
import WhyUs from "../components/WhyUs.vue";
import EnquiryForm from "../components/EnquiryForm.vue";
export default {
  name: "Index",
  components: {
    Carosuel,
    AboutUs,
    ContactUs,
    WhyUs,
    ProductMain,
    EnquiryForm
  },
  data() {
    return {
      socialIcons: [
        {
          icon: "fab fa-facebook-square",
          link: "https://facebook.com"
        },
        {
          icon: "fab fa-instagram",
          link: "https://facebook.com"
        },
        {
          icon: "fab fa-twitter",
          link: "https://facebook.com"
        }
      ]
    };
  },
  methods: {
    openSocialLinks: function(link) {
      window.open(link, "_blank");
    }
  }
};
</script>
