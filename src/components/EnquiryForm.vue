<template>
  <div class="mbb-40 mtt-50">
    <div>
      <q-separator class="mtt-20 mbb-60" inset color="primary" />
    </div>
    <div class="q-pa-md">
      <div class="row flex flex-center">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <q-card class="q-pa-md shadow-20 card-top-border" v-if="show_enq_form">
            <div class="text-h5 text-center mtt-10 mbb-30 text-primary">Enquiry Form</div>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md q-pl-md">
                  <q-input
                    filled
                    dense
                    v-model="enq_form.name"
                    label="Name/Company *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please Enter your Name or company name']"
                  />
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md q-pl-md">
                  <q-input
                    filled
                    prefix="+61"
                    dense
                    type="number"
                    v-model="enq_form.mobile"
                    label="Mobile Number *"
                    lazy-rules
                    :rules="[
        		val => val && val.length > 0 || 'Please Enter Mobile Number',
        		val => val && val.length < 10 || 'Mobile number cannot be greater than 9 digits',
        		val => val && val.length > 8 || 'Mobile number should be of 9 digits']"
                  />
                </div>
              </div>
              <q-input
                dense
                v-model="enq_form.desc"
                filled
                autogrow
                class="q-pr-md q-pl-md"
                label="Description"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please Enter Description']"
              />
              <div class="flex justify-end">
                <q-btn label="Submit" :loading="loading" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
      <div class="flex flex-center" v-if="enq_form_submitted_status">
        <q-card style="word-wrap: break-word;" class="q-pa-md shadow-20 card-top-border">
          <div
            class="text-h5 q-pa-md text-center mtt-20 text-primary"
          >Enquiry form submitted Successfully!</div>
          <div
            class="text-body q-pa-md text-center mbb-20 text-grey"
          >We will contact you in 48 hours</div>
          <div class="flex mbb-40 justify-center">
            <q-btn class label="Add Another Enquiry" @click="addAnotherEnquiry()" color="primary" />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { firebaseStorage } from "boot/firebase";
import { Notify } from "quasar";
export default {
  data() {
    return {
      enq_form: {
        name: null,
        mobile: null,
        desc: null,
        time: null
      },
      loading: false
    };
  },
  computed: {
    show_enq_form: {
      get() {
        return this.$store.state.global.enq_form_show;
      },
      set(value) {
        this.$store.commit("global/SET_ENQ_FORM_SHOW", value);
      }
    },
    enq_form_submitted_status: {
      get() {
        return this.$store.state.global.enq_form_submitted;
      },
      set(value) {
        this.$store.commit("global/SET_ENQ_FORM_SUBMITTED", value);
      }
    }
  },
  mounted() {},
  methods: {
    addAnotherEnquiry: function() {
      this.$store.commit("global/SET_ENQ_FORM_SHOW", true);
      this.$store.commit("global/SET_ENQ_FORM_SUBMITTED", false);
    },
    onSubmit: function() {
      let enqId = "enquiry" + Math.floor(Math.random() * 90000) + 10000;
      this.loading = true;
      firebaseStorage
        .collection("enquiry")
        .doc(enqId)
        .set({
          name: this.enq_form.name,
          mobile: this.enq_form.mobile,
          desc: this.enq_form.desc,
          time: new Date().toString()
        })
        .then(() => {
          Notify.create({
            message: "Enquiry Saved Successfully",
            color: "green"
          });
          this.loading = false;
          this.$store.commit("global/SET_ENQ_FORM_SHOW", false);
          this.$store.commit("global/SET_ENQ_FORM_SUBMITTED", true);
        })
        .catch(error => {
          console.log(error);
          Notify.create({
            message: "Error in saving",
            color: "red"
          });
          this.loading = false;
        });
    }
  }
};
</script>
