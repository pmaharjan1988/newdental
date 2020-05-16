<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row flex">
        <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md">
          <q-card class="q-pa-md shadow-20 card-top-border">
            <div>
              <div class="text-h5">Deliever to this address</div>
              <q-separator class="mtt-20 mbb-20" inset color="primary" />
              <div class="q-pa-md">
                <div class="text-h6 text-primary">Name : {{address_form.name}}</div>
                <div class="text-h6">Mobile : {{address_form.mobile}}</div>
                <div class="text-h6">Adddress : {{address_form.address}}</div>
                <div class="text-h6">Landmark : {{address_form.landmark}}</div>
                <div class="text-h6">PostalCode : {{address_form.postalcode}}</div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md">
          <q-card class="q-pa-md shadow-20 card-top-border">
            <div class="text-h5 text-center mtt-10 mbb-50 text-primary">Add/Edit Delivery Address</div>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md q-pl-md">
                  <q-input
                    filled
                    dense
                    v-model="address_form.name"
                    label="Name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please Enter your Name name']"
                  />
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md q-pl-md">
                  <q-input
                    filled
                    prefix="+61"
                    dense
                    type="number"
                    v-model="address_form.mobile"
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
                v-model="address_form.address"
                filled
                autogrow
                class="q-pr-md q-pl-md"
                label="Address"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please Enter Address']"
              />
              <q-input
                dense
                v-model="address_form.landmark"
                filled
                autogrow
                class="q-pr-md q-pl-md"
                label="Landmark"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please Enter Landmark']"
              />
              <q-input
                dense
                v-model="address_form.postalcode"
                filled
                class="q-pr-md q-pl-md"
                label="Postalcode"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please Enter Postalcode']"
              />
              <div class="flex justify-end">
                <q-btn
                  label="Deliver to this Address"
                  :loading="loading"
                  type="submit"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { firebaseStorage, firebaseAuth } from "boot/firebase";
import { Notify } from "quasar";
export default {
  data() {
    return {
      address_form: {
        name: null,
        mobile: null,
        address: null,
        uid: null,
        postal: null,
        landmark: null
      },
      address_data: null,
      address_id: null,
      loading: false
    };
  },

  computed: {
    /*show_enq_form:
    {
      get()
      {
        return this.$store.state.global.enq_form_show;
      },
      set(value)
      {
        this.$store.commit('global/SET_ENQ_FORM_SHOW', value)
      }
    },
    enq_form_submitted_status:
    {
      get()
      {
        return this.$store.state.global.enq_form_submitted;
      },
      set(value)
      {
        this.$store.commit('global/SET_ENQ_FORM_SUBMITTED', value)
      }
    }*/
  },
  mounted() {
    var user = firebaseAuth.currentUser;
    if (user) {
      this.address_form.uid = user.uid;

      this.getAddress(user.uid);
    }
  },
  watch: {
    address_data: {
      handler: function(newValue) {
        console.log("Person with ID:" + newValue + " modified");
      },
      deep: true
    }
  },
  methods: {
    onSubmit: function() {
      if (this.address_data == null) {
        let enqId = "address" + Math.floor(Math.random() * 90000) + 10000;
        this.loading = true;
        firebaseStorage
          .collection("address")
          .doc(enqId)
          .set({
            uid: this.address_form.uid,
            name: this.address_form.name,
            mobile: this.address_form.mobile,
            address: this.address_form.address,
            landmark: this.address_form.landmark,
            postalcode: this.address_form.postalcode
          })
          .then(() => {
            Notify.create({
              message: "Address Saved Successfully",
              color: "green"
            });
            this.loading = false;
            this.$router.replace({
              name: "Summary"
            });
          })
          .catch(error => {
            console.log(error);
            Notify.create({
              message: "Error in saving",
              color: "red"
            });
            this.loading = false;
          });
      } else {
        let addId = this.address_id;
        firebaseStorage
          .collection("address")
          .doc(addId)
          .update({
            uid: this.address_form.uid,
            name: this.address_form.name,
            mobile: this.address_form.mobile,
            address: this.address_form.address,
            landmark: this.address_form.landmark,
            postalcode: this.address_form.postalcode
          })
          .then(() => {
            this.$router.replace({
              name: "Summary"
            });
            Notify.create({
              message: "Saved Successfully",
              color: "green"
            });
          })
          .catch(error => {
            Notify.create({
              message: "Saving Error!",
              color: "red"
            });
          });
      }
    },
    async getAddress(id) {
      const uid = id;
      let address = await firebaseStorage.collection("address");
      let userAddress = address
        .where("uid", "==", uid)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }

          snapshot.forEach(doc => {
            this.address_id = doc.id;
            this.address_data = doc.data();
            let address_data = doc.data();
            this.address_form.name = address_data.name;
            this.address_form.mobile = address_data.mobile;
            this.address_form.address = address_data.address;
            this.address_form.landmark = address_data.landmark;
            this.address_form.postalcode = address_data.postalcode;
          });
        })
        .catch(err => {
          Notify.create({
            message: "Error in loading adddresses",
            color: "red"
          });
        });
    }
  }
};
</script>
