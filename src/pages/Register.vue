<template>
  <q-page class="register-bg">
    <div class="q-pa-md ">
      <div class="login-main absolute-center">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md ">
          <q-card class="q-pa-md card-top-border mtt-20 mbb-20">
            <div class="text-h5 text-primary">Register with Dental Warehouse</div>
            <q-separator class="mtt-20 mbb-20" />
            <q-input dense autofocus filled flat class="mtt-10 " type="text" v-model="form.name" label="Full Name *" lazy-rules :rules="[
        		val => val && val.length > 0 || 'Please Enter Full Name']" />
            <q-input dense filled class="mtt-10" v-model="form.email" label="Email *" type="email" lazy-rules :rules="[ val => val && val.length > 0 || 'Please Enter Email']" />
            <q-input dense filled class="mtt-10" type="password" v-model="form.password" label="Password *" lazy-rules :rules="[
        		val => val && val.length > 0 || 'Please Enter Password']" />
            <q-input dense filled class="mtt-10" type="password" v-model="form.repeat_password" label="Repeat Password *" error-message="Password & Confirm Password must match" :error="!confirmPassword" lazy-rules :rules="[
        		val => val && val.length > 0 || 'Please Enter repeat Password']" />
            <q-input dense prefix="+61" filled class="mtt-10 " type="number" v-model="form.mobile" label="Mobile Number *" lazy-rules :rules="[
        		val => val && val.length > 0 || 'Please Enter Mobile Number',
        		val => val && val.length < 10 || 'Mobile number cannot be greater than 9 digits',
        		val => val && val.length > 8 || 'Mobile number should be of 9 digits']" />
            <div class="flex justify-end">
              <q-btn label="Submit" :loading="loading" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            <div class="text-center mtt-10">
              <q-btn flat size="12px" to="/login" label="Already a member click here to login" color="primary" />
            </div>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import
{
  firebaseAuth,
  firebaseStorage
}
from 'boot/firebase'
import
{
  Notify
}
from 'quasar'
export default
{
  data()
  {
    return {
      form:
      {
        name: "",
        email: "",
        password: '',
        repeat_password: '',
        mobile: '',
      },
      loading: false,
    }
  },
  methods:
  {
    onSubmit()
    {
      this.loading = true;
      firebaseAuth.createUserWithEmailAndPassword(this.form.email, this.form.password).then(data =>
        {
          //let userState = this.$store.dispatch('global/checkUserState');

          const user = firebaseAuth.currentUser;
          if (user)
          {
            user.updateProfile(
            {
              displayName: this.form.name,
            }).then(
              (s) =>
              {
                let userUID = user.uid;
                firebaseStorage.collection('users').doc(userUID).set(
                  {
                    name: this.form.name,
                    mobile: this.form.mobile,
                    email: this.form.email,
                    usertype: 'user'
                  }).then(() =>
                  {
                    Notify.create(
                    {
                      message: 'User Created Successfully',
                      color: 'green'
                    });
                  })
                  .catch((error) =>
                  {
                    console.log(error);
                    Notify.create(
                    {
                      message: 'Error in creating user profile',
                      color: 'red'
                    })
                  })
              }

            )
          }

          this.$router.replace(
          {
            name: "Dashboard"
          });
        })
        .catch(err =>
        {
          console.log(err.message)
          this.loading = false;
          Notify.create(
          {
            message: err.message,
            color: 'red'
          });
        });
    },

    onReset()
    {
      this.form.email = null
      this.form.password = null
    },
  },
  computed:
  {
    confirmPassword()
    {
      return this.form.password == this.form.repeat_password;
    }
  }
};

</script>
