<template>
  <div class="q-pa-xl">
    <div class="q-pa-md text-center mbb-20 text-h2">Terms & Conditions</div>
    <div class="row justify-center mtt-20">
      <q-card class="bg-white w-85 q-pa-md">
        <q-card-section class="q-pa-sm text-center text-body1" style="word-wrap: break-word;">
          <div v-html="termsData"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      termsData: "Terms goes here"
    };
  }
};
</script>
