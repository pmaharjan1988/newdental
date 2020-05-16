const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }]
  },
  {
    path: '/about',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('pages/About.vue')
      }]
  },
  {
    path: '/terms',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('pages/Terms.vue')
      }]
  },
  {
    path: '/contact',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'contact',
        component: () => import('pages/Contact.vue')
      }]
  },
  {
    path: '/products',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: () => import('pages/Products.vue')
      }]
  },
  {
    path: '/login',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Login.vue')
      }]
  },
  {
    path: '/checkout',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Checkout',
        component: () => import('pages/Checkout.vue')
      }]
  },
  {
    path: '/admin/login',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminLogin',
        component: () => import('pages/AdminLogin.vue')
      }]
  },
  {
    path: '/register',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('pages/Register.vue')
      }]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('pages/Dashboard.vue')
      }]
  },
  {
    path: '/myaccount',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'MyAccount',
        component: () => import('pages/MyAccount.vue')
      }]
  },
  {
    path: '/myorders',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Orders',
        component: () => import('pages/MyOrders.vue')
      }]
  },
  {
    path: '/address',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Address',
        component: () => import('pages/Address.vue')
      }]
  },
  {
    path: '/summary',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Summary',
        component: () => import('pages/Summary.vue')
      }]
  },
  {
    path: '/payment',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Payment',
        component: () => import('pages/Payment.vue')
      }]
  },
  {
    path: '/admin/dashboard',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('pages/AdminDashboard.vue')
      }]
  },
  {
    path: '/user/profile',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('pages/Profile.vue')
      }]
  },
  {
    path: '/product/:id',

    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'OpenProduct',
        component: () => import('pages/OpenProduct.vue')
      }]
  },
  {
    path: '/admin/enquiry',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminEnquiry',
        component: () => import('pages/Admin/EnquiryMain.vue')
      }]
  },
  {
    path: '/admin/fpr',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminFPR',
        component: () => import('pages/Admin/ForgotPasswordRequest.vue')
      }]
  },
  {
    path: '/admin/orderlist',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminOrders',
        component: () => import('pages/Admin/AdminOrders.vue')
      }]
  },
  {
    path: '/admin/userslist',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminUsersList',
        component: () => import('pages/Admin/UsersList.vue')
      }]
  },
  {
    path: '/admin/addproduct',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AddProduct',
        component: () => import('components/Admin/AddProducts.vue')
      }]
  },]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push(
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    })
}

export default routes
