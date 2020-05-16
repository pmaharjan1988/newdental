import Vue from 'vue'

export function SET_LOGGED_IN(state, value) {
  state.user.loggedIn = value;
}

export function SET_USER(state, data) {
  state.user.data = data;
}

export function SET_ENQ_FORM_SHOW(state, data) {
  state.enq_form_show = data;
}

export function SET_ENQ_FORM_SUBMITTED(state, data) {
  state.enq_form_submitted = data;
}

export function SET_ADDRESS(state, data) {
  state.address = data;
}

export function SET_USER_ORDERS(state, data) {
  state.user_orders = data;
}

export function SET_USER_PROFILE(state, data) {
  state.user_profile = data;
}


export function SET_ORDER_DATES(state, data) {
  state.order_dates = data;
}

export function SET_ORDER(state, data) {
  state.order = data;
}

export function SET_TO_CART(state, data) {

  state.cart.push(data);

}

export function SET_ALL_PRODUCT_DATA(state, data) {
  state.product_data = data;
}


export function SET_SINGLE_PRODUCT_DATA(state, data) {
  state.product_single = data;
}

export function SET_LOGGIN_NAVIGATION(state, data) {
  state.login_navigation = data;
}


export function DELETE_FROM_CART(state, id) {
  let cartData = state.cart;
  let result = cartData.findIndex(item => item.id == id);
  if (result > -1) {
    cartData.splice(result, 1);
  }
}
