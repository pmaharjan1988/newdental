<template>
  <q-page padding>
    Admin Dashboard
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" style="height:350px" v-for="(item,index) in cardItems" :key="index">
        <q-img :src="item.imgUrl" />
        <q-card-section :class="item.class">
          <div class="text-h6">{{item.label}}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn :to="item.to" color="primary">{{item.btnLabel}}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      cardItems: [
        {
          label: "Add Products",
          btnLabel: "Go",
          imgUrl:
            "https://cdn.pixabay.com/photo/2020/02/09/06/51/snow-4832106_1280.jpg",
          to: "/admin/addproduct",
          class: "bg-primary text-white"
        },
        {
          label: "Enquiries",
          btnLabel: "Go",
          imgUrl:
            "https://cdn.pixabay.com/photo/2020/04/19/09/38/landscape-5062695_1280.jpg",
          to: "/admin/enquiry",
          class: "bg-primary text-white"
        },
        {
          label: "Orders",
          btnLabel: "Go",
          imgUrl:
            "https://cdn.pixabay.com/photo/2020/04/17/14/16/landscape-5055384_1280.jpg",
          to: "/admin/orderlist",
          class: "bg-primary text-white"
        },
        {
          label: "Users",
          btnLabel: "Go",
          imgUrl:
            "https://cdn.pixabay.com/photo/2020/04/06/12/38/daisy-5009533__340.jpg",
          to: "/admin/userslist",
          class: "bg-primary text-white"
        },
        {
          label: "Forgot Password Requests",
          btnLabel: "Go",
          imgUrl:
            "https://cdn.pixabay.com/photo/2020/04/19/09/07/fantasy-5062586__340.jpg",
          to: "/admin/fpr",
          class: "bg-primary text-white"
        }
      ]
    };
  }
};
</script>
