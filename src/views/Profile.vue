<template>
  <div>
    <h1 class="heading">My Profile</h1>
    <moon-loader v-if="loading" color="white" class="fixed-center" />
    <div v-else>
      <section class="profile-section">
        <div class="list-item">
          <font-awesome-icon icon="fa-solid fa-user" />
          <p>Name</p>
          <span>{{ editedProfile.name }}</span>
        </div>
        <div class="separator" />
        <div class="list-item">
          <font-awesome-icon icon="fa-solid fa-envelope" />
          <p>Email</p>
          <span>{{ editedProfile.email }}</span>
        </div>

        <div class="separator" />
        <div class="list-item">
          <font-awesome-icon icon="fa-solid fa-medal" />
          <p>Sport</p>
          <ToggleGrid
            :options="sportOptions"
            :selectedOption="selectedSport"
            @selected="(opt) => handleSelectSport(opt)"
          />
          <!-- <input v-model="editedProfile.sport" @input="checkChanges" /> -->
        </div>
        <div class="separator" />
        <div class="list-item">
          <font-awesome-icon icon="fa-solid fa-map-pin" />
          <p>Zip code</p>
          <input
            v-model="editedProfile.zipCode"
            @input="checkChanges"
            type="text"
            placeholder="Enter ZIP code"
          />
          <span v-if="zipCodeError" class="error-message">{{
            zipCodeError
          }}</span>
        </div>
        <div class="separator" />
        <!-- <div class="list-item">
          <font-awesome-icon icon="fa-solid fa-home-user" />
          <p>Address:</p>
          <span>{{ editedProfile.address }}</span>
        </div> -->
      </section>
      <section class="logout-section">
        <button class="btn-update" v-show="hasChanges" @click="updateProfile">
          <moon-loader v-if="updating" size="13px" color="white" />
          Update Profile
        </button>
        <button class="btn-logout" @click="handleLogout" :disabled="loggingOut">
          <moon-loader v-if="loggingOut" size="13px" color="white" />
          <span v-else>Logout</span>
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../firebase";
import ToggleGrid from "@/components/ToggleGrid";
import { firebase, firestore } from "../firebase";
import getCoordinates from "../utils/locationGeoLocation";

export default {
  name: "Profile",
  data() {
    return {
      zipCodeError: "",
      selectedSport: "",
      loading: true,
      loggingOut: false,
      editedProfile: null,
      originalProfile: null,
      hasChanges: false,
      updating: false,
      sportOptions: [
        { label: "Tennis", value: "Tennis" },
        { label: "Pickleball", value: "Pickleball" },
      ],
    };
  },

  components: { ToggleGrid },
  computed: {
    ...mapState("auth", ["profile"]),
  },
  async mounted() {
    await this.$store.dispatch("auth/fetchProfile");
    this.loading = false;
    this.initializeProfile();
  },

  methods: {
    initializeProfile() {
      // Create a deep copy of the profile object to store the edited version
      this.editedProfile = JSON.parse(JSON.stringify(this.profile));
      // Store the original profile for comparison
      this.originalProfile = JSON.parse(JSON.stringify(this.profile));
      this.selectedSport = this.originalProfile.sport;
    },

    handleSelectSport(sport) {
      this.editedProfile.sport = sport;
      this.selectedSport = sport;
      this.checkChanges();
    },
    checkChanges() {
      // Compare the edited profile with the original profile to determine if there are any changes
      this.hasChanges =
        JSON.stringify(this.editedProfile) !==
        JSON.stringify(this.originalProfile);
    },

    async updateProfile() {
      // Perform the profile update logic here
      // You can access the edited profile using this.editedProfile
      // Once the update is successful, you can reset the original profile and clear the hasChanges flag
      this.updating = true;
      const cordinates = await getCoordinates(this.editedProfile.zipCode);
      if (this.editedProfile.zipCode) {
        if (!cordinates) {
          this.zipCodeError = "Invalid ZIP code format.";
          this.updating = false;
          return;
        }
      } else {
        this.zipCodeError = "Please update your Zip code to save";
        this.updating = false;
        return;
      }

      this.zipCodeError = "";
      const { email, name, sport, zipCode, id } = JSON.parse(
        JSON.stringify(this.editedProfile)
      );
      this.editedProfile.address = cordinates.address;
      const payload = {
        email,
        name,
        sport,
        zipCode,
        address: cordinates.address,
        lng: cordinates.lng,
        lat: cordinates.lat,
      };
      let updater = await firestore
        .collection("users")
        .doc(id)
        .update({
          ...payload,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      this.originalProfile = JSON.parse(JSON.stringify(this.editedProfile));
      this.hasChanges = false;
    },
    async handleLogout() {
      this.loggingOut = true;
      await auth.signOut();
      this.loggingOut = false;

      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.heading {
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 1rem;
}

.profile-section,
.rsvp-section {
  background: rgb(218, 217, 217);
  padding: 0 1rem;

  .separator {
    height: 1px;
    width: 100%;
    background-color: $primary;
  }
}

.logout-section {
  margin-top: 2rem;
}

.rsvp-section {
  margin-top: 1rem;
  margin-bottom: 3rem;

  .badge {
    width: 1.5rem;
    height: 1.5rem;
    background-color: $primary;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-item {
  display: grid;
  grid-template-columns: 1.25rem 5rem 1fr auto;
  grid-gap: 1rem;
  gap: 1rem;
  color: $primary;
  padding: 0.6rem;
  align-items: center;

  input {
    min-height: 40px;
    background: hsla(0, 0%, 100%, 0.4);
    padding: 0 0.5rem;
    font-size: 1em;
    border: none;
    transition: 0.07s;
  }

  p {
    font-weight: 600;
    color: black;
  }
  span {
    font-size: 0.9em;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    background: transparent;
    border: none;
    font-weight: 500;
    color: $primary;
  }
  .dot-wrapper {
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 0.8rem;
    gap: 0.8rem;
    width: fit-content;
    align-items: center;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary;
  }
}
.btn-logout {
  border: 2px solid $primary;
  border-radius: 2rem;
  background: transparent;
  color: $primary;
  padding: 0.6rem 3rem;
  margin: 0 auto;
  display: flex;
  font-size: 0.9em;
  min-height: 2.5rem;
}

.btn-update {
  border: 2px solid $primary;
  border-radius: 2rem;
  background: transparent;
  color: $primary;
  padding: 0.6rem 3rem;
  margin: 0 auto;
  display: flex;
  font-size: 0.9em;
  min-height: 2.5rem;

  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-size: 15px;
  grid-column-start: 3;
  grid-column-end: 5;
}
</style>
