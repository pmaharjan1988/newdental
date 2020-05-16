export function user(state) {
  console.log('getter ', state.user)
  return state.user
}

export function getEnqFormShowStatus(state) {
  return state.enq_form_show;
}

export function getEnqFormSubmittedStatus(state) {
  return state.enq_form_submitted;
}

export function getCartItems(state) {
  return state.cart
}

export function getAddress(state) {
  return state.address
}
export function getOrderDates(state) {
  return state.order_dates
}

export function getCartCount(state) {
  return state.cart.length
}

export function getSingleProductData(state) {
  return state.product_single;
}

export function getUserMainProfile(state) {
  return state.user_profile;
}

export function getUserOrders(state) {
  return state.user_orders;
}

export function getAllProductData(state) {
  return state.product_data;
}

export function getLoginNavigation(state) {
  return state.login_navigation;
}

export function getUserId(state) {
  return state.user.data.uid;
}

export function getProductTotal(state) {
  let cartItems = state.cart;
  let total = 0;
  if (cartItems.length > 0) {

    let sum = cartItems
      .map(item => item.price)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(sum);

    total = sum;
  }
  return total;
}
