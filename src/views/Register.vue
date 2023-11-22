<template>
  <div class="login-page">
    <div class="form">
      <div class="input-line">
        <label>Name</label>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <div class="input-line">
        <label>Email</label>
        <input type="email" placeholder="Email" v-model="email" />
        <div v-if="emailError"></div>
        <span v-if="emailError" style="color: red; font-size: 15px">{{
          emailError
        }}</span>
      </div>
      <div class="input-line">
        <label>Password</label>
        <input type="password" placeholder="Password" v-model="password" />
      </div>

      <div class="input-line">
        <label>Sport</label>
        <ToggleGrid
          :options="sportOptions"
          :selectedOption="selectedSport"
          @selected="(opt) => handleSelectSport(opt)"
        />
      </div>
      <div class="input-line">
        <label>Zip code</label>
        <input
          v-model="zipCode"
          name="zipCode"
          type="text"
          placeholder="Enter ZIP code"
        />
        <div v-if="zipCodeError"></div>
        <span v-if="zipCodeError" style="color: red; font-size: 15px">{{
          zipCodeError
        }}</span>
      </div>
    </div>
    <div class="action">
      <button :disabled="submitDisabled" @click="submit">
        <moon-loader v-if="loading" color="white" size="13px" />
        <span v-else>Create</span>
      </button>
      <div class="or">or</div>
      <button @click="handleLogin">Log in to Existing Account</button>
    </div>
  </div>
</template>

<script>
import { auth, firestore, firebase } from "../firebase";
import ToggleGrid from "@/components/ToggleGrid";
import getCoordinates from "../utils/locationGeoLocation";

export default {
  name: "register",
  components: { ToggleGrid },

  data() {
    return {
      name: null,
      email: null,
      emailError: "",
      password: null,
      loading: false,
      selectedGender: null,
      selectedSport: null,

      zipCode: "",
      zipCodeError: "",
      genderOptions: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
      ],
      sportOptions: [
        { label: "Tennis", value: "Tennis" },
        { label: "Pickleball", value: "Pickleball" },
      ],
    };
  },

  computed: {
    submitDisabled() {
      return (
        this.loading ||
        !this.name ||
        !this.email ||
        !this.password ||
        !this.zipCode ||
        !this.selectedSport
      );
    },
  },
  methods: {
    handleSelectGender(gender) {
      this.selectedGender = gender;
    },
    handleSelectSport(sport) {
      this.selectedSport = sport;
    },
    async submit() {
      this.loading = true;

      const cordinates = await getCoordinates(this.zipCode);

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = "Invalid email address";
        this.loading = false;
        return;
      }
      this.emailError = "";
      if (!cordinates) {
        this.zipCodeError = "Invalid ZIP code format.";
        this.loading = false;
        return;
      }
      this.zipCodeError = "";

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const user = userCredential.user;
        await firestore.collection("users").doc(user.uid).set({
          name: this.name,
          email: this.email,
          gender: this.selectedGender,
          zipCode: this.zipCode,
          sport: this.selectedSport,
          address: cordinates.address,
          lng: cordinates.lng,
          lat: cordinates.lat,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        this.loading = false;
        this.$router.push({
          name: "home",
        });
      } catch (error) {
        alert(error.message);
        this.loading = false;
      }
    },
    handleLogin() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/login.scss";
</style>
