<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="q-gutter-y-md" style="max-width: 800px">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-primary text-white shadow-2"
            active-color="white"
            active-bg-color="black"
            indicator-color="black"
            align="justify"
            narrow-indicator
          >
            <q-tab name="profile" icon="mail" label="Profile" />
            <q-tab name="address" icon="mail" label="Address" />
            <q-tab name="payment" icon="mail" label="Payment" />
          </q-tabs>

          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="profile">
              <div class="text-h6">Profile Info</div>
              <q-separator class="mtt-10 mbb-10" inset color="primary" />

              <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                  <q-slide-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="email" />
                      </q-item-section>
                      <q-item-section>
                        Email:
                        <div class="text-secondary">{{userProfile.email}}</div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="account_circle" />
                      </q-item-section>
                      <q-item-section>
                        Name:
                        <div class="text-secondary">{{userProfile.name}}</div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="settings_phone" />
                      </q-item-section>
                      <q-item-section>
                        Mobile:
                        <div class="text-secondary">{{userProfile.mobile}}</div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="shopping_basket" />
                      </q-item-section>
                      <q-item-section>
                        Total Orders:
                        <div class="text-secondary">{{this.userOrders.length}}</div>
                      </q-item-section>
                    </q-item>
                  </q-slide-item>
                </q-list>
              </div>
              <div></div>
            </q-tab-panel>

            <q-tab-panel name="address">
              <div class="text-h6">Address Info</div>
              <q-separator class="mtt-10 mbb-10" inset color="primary" />
              <div class="q-pa-md">
                <div>
                  <div class="q-pa-md">
                    <div class="text-body text-primary">Name : {{address_form.name}}</div>
                    <div class="text-body">Mobile : {{address_form.mobile}}</div>
                    <div class="text-body">Adddress : {{address_form.address}}</div>
                    <div class="text-body">Landmark : {{address_form.landmark}}</div>
                    <div class="text-body">PostalCode : {{address_form.postalcode}}</div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="payment">
              <div class="text-h6">Payment Info</div>
              <q-separator class="mtt-10 mbb-10" inset color="primary" />

              <div class="q-pa-md row justify-center">
                <q-icon name="fab fa-paypal" class="text-teal" style="font-size: 6.4em;" />
              </div>
              <div class="text-grey text-center">Paypal</div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { Notify } from "quasar";
import { firebaseStorage, firebaseAuth } from "boot/firebase";

export default {
  data() {
    return {
      tab: "profile",
      address_form: {
        name: null,
        mobile: null,
        address: null,
        uid: null,
        postal: null,
        landmark: null
      }
    };
  },
  computed: {
    ...mapGetters({
      userId: "global/getUserId",
      userProfile: "global/getUserMainProfile",
      userOrders: "global/getUserOrders"
    })
  },
  created() {
    this.initProfile();
  },
  methods: {
    initProfile: async function() {
      await this.$store.dispatch("global/userMainProfile", this.userId);
      await this.getAddress(this.userId);
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
