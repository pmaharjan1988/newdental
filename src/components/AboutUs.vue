<template>
  <div class="q-pa-xl">
    <div class="q-pa-md text-center mbb-20 text-h2">
      About
    </div>
    <div class="row justify-center mtt-20">
      <q-card class="bg-white w-85 q-pa-md ">
        <q-card-section class="q-pa-sm text-center text-body1 " style="word-wrap: break-word;">
          <div v-html="about_data"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default
{
  // name: 'ComponentName',
  data()
  {
    return {
      about_data: "Dental Warehouse Pty Ltd is the professional wholesale supplier of all dental equipment based in Brisbane, Australia. Most of our products are ISO certified products while some of them have FDA certificate.<br><br>Our main products are dental handpiece, orthodontic brackets, X-Ray and sensor, dental units, curing light, camera, scaler among many others. We aim to provide customer fast and reliable service with fastest shipping possible. We aim to provide largest array of products and increasing our products every other day and are committed to being your trusted business partner, and promise you can always rely on us for all your dental needs.",
    }
  }
}

</script>
