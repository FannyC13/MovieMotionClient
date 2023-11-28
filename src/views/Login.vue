<template>
    <body>
      <div class="LoginPage">
        <div class="loginBox">
          <div class="loginContainer">
            <div class="loginForm">
              <h2>Welcome back</h2>
              <form @submit.prevent action="" method="post">
                <div class="loginInputBox">
                  <input
                    v-model="email_user"
                    type="text"
                    name="txtEmail"
                    placeholder="Email"
                  />
                </div>
                <div class="loginInputBox">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <p
                      class="CharacterLimitMessage"
                      style="color: red; text-align: center; font-weight: bold"
                    >{{ message }}</p>
                <div class="loginInputBox">
                  <input type="submit" value="Login" />
                </div>
              </form>
              <p class="forgotPswd">
                Forgot your password ?
                <router-link to="/fgpassword-page">Reset it</router-link>
              </p>
              <p class="forgotPswd" style="margin-top: -2%">
                New here ? <router-link to="/register-page">Sign up</router-link>
              </p>
              <p class="forgotPswd" style="margin-top: -2%">
                Need Help ?<router-link to="/help-page">Contact us</router-link>
              </p>
            </div>
          </div>
    
        </div>
      </div>
    </body>
  </template>
  
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      email_user: "",
      password: "",
      message: "",
      addressServer: localStorage.getItem("addressServer"),
    };
  },
})
</script>
  
  <style></style>
  