<template>
  <q-page class="login-bg">
    <div class="q-pa-md">
      <div class="login-main absolute-center">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card class="q-pa-md card-top-border">
            <div class="text-h5 text-primary">Login</div>
            <q-separator class="mtt-20 mbb-20" />
            <q-input
              filled
              v-model="form.email"
              label="Email *"
              type="email"
              autofocus
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please Enter Email']"
            />
            <q-input
              filled
              class="mtt-10"
              type="password"
              v-model="form.password"
              label="Password *"
              lazy-rules
              :rules="[
            val => val && val.length > 0 || 'Please Enter Password']"
            />
            <div class="flex justify-end">
              <q-btn label="Submit" :loading="loading" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            <div class="text-center mtt-10">
              <q-btn
                flat
                size="12px"
                label="Forgot Password"
                @click="showHideForgetEmailPrompt"
                color="secondary"
              />
            </div>
            <div class="text-center mtt-10">
              <q-btn
                flat
                size="12px"
                to="/register"
                label="Not a member. Click here to register."
                color="primary"
              />
            </div>
          </q-card>
          <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Email address</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="forgetAddress"
                  autofocus
                  @keyup.enter="prompt = false"
                  lazy-rules
                  type="email"
                  :rules="[
                  val => val && val.length > 0 || 'Please Enter Email']"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat :loading="loading" label="Reset Password" @click="resetPassword()" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { firebaseStorage, firebaseAuth } from "boot/firebase";
import { Notify } from "quasar";

import { provideAlert } from "../js/common";
export default {
  data() {
    return {
      form: {
        email: "test@gmail.com",
        password: "redevil"
      },
      loading: false,
      forgetAddress: null,
      prompt: false
    };
  },
  mounted() {},

  methods: {
    onSubmit() {
      this.loading = true;
      firebaseAuth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          let userState = this.$store.dispatch("global/checkUserState");

          let loginNav = this.$store.getters["global/getLoginNavigation"];

          if (loginNav === "FROM_CHECKOUT") {
            this.$router.replace({
              name: "Checkout"
            });
          } else {
            this.$router.replace({
              name: "Dashboard"
            });
          }
        })
        .catch(err => {
          console.log(err.message);
          this.error = err.message;
          this.loading = false;
          Notify.create({
            message: "Error in logging. Check Username and Password",
            color: "red"
          });
        });
    },
    showHideForgetEmailPrompt() {
      this.prompt = !this.prompt;
    },
    resetPassword() {
      const email = this.forgetAddress;
      const forgetID =
        "forgotPassword" + Math.floor(Math.random() * 90000) + 10000;
      if (email) {
        firebaseStorage
          .collection("forgot_password_request")
          .doc(forgetID)
          .set({
            email,
            status: "Pending",
            date: new Date()
          })
          .then(() => {
            Notify.create({
              message:
                "Forget Password request submitted to admin. Your request will be processed in 48 hours",
              color: "green"
            });
            this.loading = false;
            this.prompt = false;
          })
          .catch(error => {
            console.log(error);
            Notify.create({
              message: "Error in reseting password",
              color: "red"
            });
            this.loading = false;
            this.prompt = false;
          });
      } else {
        Notify.create({
          message: "Error in reseting password",
          color: "red"
        });
        this.prompt = false;
      }
    },
    onReset() {
      this.form.email = null;
      this.form.password = null;
    }
  }
};
</script>
