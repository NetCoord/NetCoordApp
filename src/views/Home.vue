<template>
  <div class="home-page">
    <div class="content">
      <CourtAvailabilityMap :sortedCourt="sortedCourts[0]" />
      <div class="t-list">
        <div class="list-head">
          <span>Available Now</span>
          <span>Park</span>
          <span>Schedule</span>
        </div>
        <div class="list-body">
          <list-loading v-if="courts.loading" />
          <template v-else>
            <div
              style="color: #ffffff !important"
              v-for="court in sortedCourts"
              :key="court.id"
              class="list-item"
            >
              <div @click="goToDetail(court)">
                <span>
                  <template v-if="court.isRaining"
                    ><i class="fas fa-cloud-rain"></i
                  ></template>
                  <template v-else
                    ><span
                      class="dot"
                      :class="getFreeCourt(court) > 0 ? 'avail' : 'unavail'"
                    ></span
                  ></template>
                  {{ getFreeCourt(court) }} of {{ court.courtNum }}
                </span>
                <span>{{ court.name }}</span>
                <template v-if="court.availability">
                  <span
                    v-if="
                      court.availability.count === 0 &&
                      court.availability.availableAt
                    "
                    class="small avail"
                    >Avail at<br />{{
                      court.availability.availableAt | displayDate("hh:mm A")
                    }}</span
                  >
                  <span
                    v-else-if="
                      court.availability.count >= 1 &&
                      court.availability.unavailableAt
                    "
                    class="small unavail"
                    >Unavail at<br />
                    {{
                      court.availability.unavailableAt | displayDate("hh:mm A")
                    }}</span
                  >
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import ListLoading from "../components/loading/ListLoading.vue";
import CourtAvailabilityMap from "../components/home/CourtAvailabilityMap.vue";
import CourtAvailabilityMixin from "../mixins/court-availability-mixin";

export default {
  components: { ListLoading, CourtAvailabilityMap },
  name: "home",
  mixins: [CourtAvailabilityMixin],
  data() {
    return {
      myPosition: null,
    };
  },
  computed: {
    ...mapState("court", ["courts"]),
    ...mapState("auth", ["profile"]),
    ...mapGetters({
      courtWithTimes: "court/courtWithTimes",
    }),
    sortedCourts() {
      if (this.myPosition) {
        // Sort courts from the closest to farthest

        return this.courts.data
          .map((court) => {
            return {
              ...court,
              distance: this.getDistanceFromPlace(court),
              ...this.getTodayAvailability(court),
            };
          })
          .sort((a, b) => (a.distance > b.distance ? 1 : -1));
      } else {
        // Sort courts by last report having 2 or more courts available
        return [...this.courts.data]
          .sort((a, b) => {
            if (!a.updatedAt) {
              return 1;
            }
            const isBefore = moment(a.updatedAt).isBefore(b.updatedAt);
            return isBefore ? 1 : -1;
          })
          .map((court) => {
            return {
              ...court,
              ...this.getTodayAvailability(court),
            };
          });
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/fetchProfile");
    this.myPosition = {
      latitude: this.profile.lat,
      longitude: this.profile.lng,
    };
    this.geolocate();
  },
  methods: {
    goToDetail(court) {
      this.$router.push({
        name: "courtSchedule",
        params: {
          id: court.id,
        },
      });
    },
    geolocate() {
      // console.log(this.myPosition, "position");
      // navigator.geolocation.getCurrentPosition((position) => {
      //   this.myPosition = position.coords;
      //   console.log(this.myPosition, "position");
      // });
    },
    getDistanceFromPlace({ location }) {
      const distanceInKm = this.getDistanceFromLatLonInKm(
        this.myPosition.latitude,
        this.myPosition.longitude,
        location.latitude,
        location.longitude
      );
      return distanceInKm * 0.621371; // miles
    },
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/home.scss";
</style>
