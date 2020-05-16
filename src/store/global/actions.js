import {
  firebaseStorage
}
  from 'boot/firebase'
import {
  getYear,
  format
}
  from 'date-fns'
import * as firebase from "firebase/app";
import {
  LocalStorage
}
  from 'quasar'


export async function fetchUser(
  {
    commit
  }, user) {
  if (user) {

    commit("SET_LOGGED_IN", true);
    commit("SET_USER",
      {

        displayName: 'User',
        email: user.email,
        uid: user.uid
      });
    LocalStorage.set('STORAGEUSER', true)

  }
  else {
    LocalStorage.set('STORAGEUSER', false)
    commit("SET_LOGGED_IN", false);
    commit("SET_USER", null);
  }
}

export async function checkUserState(context) {
  await firebase.auth().onAuthStateChanged(async user => {
    context.dispatch("fetchUser", user);
  });

}

export function addToCheckout(context, data) {
  context.commit("SET_TO_CART", data);
}

export function setOrderDates(context, data) {
  context.commit("SET_ORDER_DATES", data);
}


export async function getAllProducts(context) {
  console.log(1)
  let products_data;
  let productCollection = await firebaseStorage.collection('products').get()
    .then(querySnapshot => {
      console.log(2)

      products_data = querySnapshot.docs.map(doc => doc.data());
      products_data = products_data.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
      context.commit("SET_ALL_PRODUCT_DATA", products_data);
    })
    .catch(err => {
      console.log("getAllProducts -> err", err)

    });
}

export async function getUserOrders(context, id) {
  let extractOrders;
  await firebaseStorage.collection('orders').where('userId', '==', id).get().then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    else {
      extractOrders = snapshot.docs.map(doc => doc.data());
      extractOrders = extractOrders.sort((a, b) => {
        let x = new Date(a.orderDates.todaysDate.toDate())
        let y = new Date(b.orderDates.todaysDate.toDate())
        return y - x;
      });
      console.log("getUserOrders -> extractOrders", extractOrders)

    }
    context.commit("SET_USER_ORDERS", extractOrders);
  })
    .catch(err => {
      console.log('Error getting orders', err);
    });
}

export async function setEmptyUserOrders(context) {
  const order = [];
  await context.commit("SET_USER_ORDERS", order);
}

export async function getSingleProduct(context, id) {
  let productData = await firebaseStorage.collection('products');
  let query = productData.where('id', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach(doc => {
        let product = doc.data();
        context.commit("SET_SINGLE_PRODUCT_DATA", product);
      })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

export async function userMainProfile(context, id) {
  let userData = await firebaseStorage.collection('users').doc(id).get()
    .then(doc => {
      if (doc.empty) {
        console.log('No user found')
        return;
      }
      else {
        context.commit("SET_USER_PROFILE", doc.data());
      }
    });

}
