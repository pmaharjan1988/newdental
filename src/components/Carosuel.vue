<template>
  <div class="q-pr-xl q-pl-xl">
    <q-carousel arrows animated v-model="slide" height="80vh" infinite autoplay>
      <q-carousel-slide name="first" img-src="/statics/doctor.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2 q-pa-lg">First image</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="/statics/doctor1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">second image</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Third image</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "first"
    };
  }
};
</script>