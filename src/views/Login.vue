<template>
  <div class="login-page">
    <div class="form">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <!-- <button @click="goTo('resetPassword')" class="reset-pwd">Reset Password</button> -->
    </div>
    <div class="action">
      <button :disabled="submitDisabled" @click="submit">
        <moon-loader v-if="loading" color="white" size="13px" />
        <span v-else>Log in</span>
      </button>
      <div class="or">or</div>
      <button  @click="goTo('register')">Create an account</button>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase'

export default {
  name: "login",
  data () {
    return {
      loading: false,
      email: null,
      password: null
    }
  },
  computed: {
    submitDisabled () {
      return this.loading || (
        !this.email || !this.password
      )
    }
  },
  methods: {
    goTo(routeName) {
      this.$router.push({
        name: routeName
      })
    },
    async submit () {
      this.loading = true
      
      try {
        const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password)
        const user = userCredential.user;
        this.$store.dispatch('auth/setUser', user);

        this.loading = false
        this.$router.push({
          name: 'home'
        });
      }
      catch (error) {
        alert(error.message)
        this.loading = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/login.scss";
</style>
