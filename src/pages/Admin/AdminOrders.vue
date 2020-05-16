<template>
  <div>
    <div class="text-center text-h3 text-primary q-pa-lg">Orders List</div>
    <div class="q-pa-md">
      <div class="row flex flex-center">
        <q-card
          class="q-pa-md shadow-20 card-top-border col-md-8"
          style="height:60vh; overflow:auto"
        >
          <q-list>
            <div v-for="(item,index) in enq_data" :key="index">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-uppercase text-primary fw-600">Name : {{ item.name}}</q-item-label>
                  <q-item-label caption>Email: {{ item.email }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption class="text-positive">{{ item.mobile }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset class="mtt-10 mbb-10" />
            </div>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import { firebaseStorage } from "boot/firebase";
import { format, formatDistance } from "date-fns";
export default {
  data() {
    return {
      enq_data: []
    };
  },
  created() {
    this.initEnquiries();
  },
  filters: {
    formatTime: function(value) {
      return formatDistance(new Date(value.toDate()), new Date(), {
        includeSeconds: true,
        addSuffix: true
      });
    }
  },

  methods: {
    initEnquiries: function() {
      let enquiryCollection = firebaseStorage
        .collection("users")
        .get()
        .then(querySnapshot => {
          let data = querySnapshot.docs.map(doc => {
            let qData = doc.data();
            qData.id = doc.id;
            return qData;
          });
          this.enq_data = data;
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
    },
    deleteEnquiry: function(id) {
      var deleteQuery = firebaseStorage
        .collection("forgot_password_request")
        .doc(id)
        .update({ status: "Processed" });
      this.initEnquiries();
    }
  }
};
</script>