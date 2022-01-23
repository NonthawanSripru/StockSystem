<template>
  <div id="app">
    <v-app :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }" dark>
      <v-row align="center">
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your e-mail and password:</p>
              <v-form>
                <v-text-field
                  outline
                  label="E-mail"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outline
                  hide-details
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn
                color="info"
                :large="$vuetify.breakpoint.smAndUp"
                @click="signup"
              >
                Sign up
              </v-btn>
              <v-btn color="info" @click="forgotPassword" text>
                Forgot password?
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="info"
                :large="$vuetify.breakpoint.smAndUp"
                @click="loginWithEmail()"
              >
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-dialog v-model="dialogSignup" persistent max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Register User</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.name"
                        label="Name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email*"
                        v-model="user.email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        v-model="user.password"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogSignup = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveUser">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-row>
    </v-app>
  </div>
</template>
<script>
import firebase from "firebase";
import "firebase/auth";
// import { db } from "../firebaseDb";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      darkTheme: true,
      platformName: "Login",
      dialogSignup: false,
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    loginWithEmail() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/home/homeMenu");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    forgotPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          alert("Check your registered email to reset the password!");
          this.user = {
            email: "",
          };
        })
        .catch((error) => {
          alert(error);
        });
    },
    signup() {
      this.dialogSignup = true;
    },
    saveUser(){
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.dialogSignup=false;
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  },
};
</script>
<style scoped>
.v-btn,
.v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}
</style>