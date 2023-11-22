<template>
  <GmapMap
    v-if="center"
    :center="center"
    :zoom="13"
    map-type-id="terrain"
    style="width: 100%; height: 260px"
    ref="mapRef"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      disableDefaultUi: false,
    }"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      clickable
      :draggable="false"
      :icon="getMarkerIcon(m)"
      @click="handleMarkerClick(m)"
    />
    <GmapInfoWindow
      :opened="!!selectedMarker"
      :position="selectedMarker && selectedMarker.position"
      :options="{
        pixelOffset: {
          width: 0,
          height: -35,
        },
      }"
      @closeclick="selectedMarker = null"
    >
      <div v-if="selectedMarker" class="info-window-content">
        <h3 @click="goToCourtDetail(selectedMarker.court)">
          {{ selectedMarker.court.name }}
        </h3>
        <p>
          {{ getFreeCourt(selectedMarker.court) }} of
          {{ selectedMarker.court.courtNum }} court{{
            getFreeCourt(selectedMarker.court) > 1 ? "s" : ""
          }}
          free
        </p>
        <p
          v-if="
            getFreeCourt(selectedMarker.court) === 0 &&
            selectedMarker.availability.availableAt
          "
        >
          Available at
          {{ selectedMarker.availability.availableAt | displayDate("hh:mm A") }}
        </p>
        <p
          v-else-if="
            getFreeCourt(selectedMarker.court) >= 1 &&
            selectedMarker.availability.unavailableAt
          "
        >
          Available until
          {{
            selectedMarker.availability.unavailableAt | displayDate("hh:mm A")
          }}
        </p>
      </div>
    </GmapInfoWindow>
  </GmapMap>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getLatLngCenter } from "../../helpers.js";
import CourtAvailabilityMixin from "../../mixins/court-availability-mixin";

const getInitialCenter = () => ({
  lat: 30.179154403043913,
  lng: -95.51819553625609,
});

export default {
  name: "CourtAvailabilityMap",
  mixins: [CourtAvailabilityMixin],
  data() {
    return {
      center: getInitialCenter(),
      selectedMarker: null,
      myPosition: "",
      markers: null,
    };
  },
  props: ["sortedCourt"],
  computed: {
    ...mapState("court", ["courts", "courtAvailability"]),
    ...mapState("auth", ["profile"]),
    ...mapGetters({
      courtWithTimes: "court/courtWithTimes",
    }),

    courtMarkers() {
      const markers = this.courts.data.map((court) => {
        return {
          position: {
            lat: court.location._lat,
            lng: court.location._long,
          },
          court,
          ...this.getTodayAvailability(court),
        };
      });
      this.markers = markers;
      return markers;
    },

    defaultCenter() {
      if (!this.courtMarkers.length) {
        return getInitialCenter();
      }

      const latlngs = this.courtMarkers.map(({ position }) => [
        position.lat,
        position.lng,
      ]);

      const center = getLatLngCenter(latlngs);
      if (this.sortedCourt) {
        return {
          lat: this.sortedCourt.location._lat,
          lng: this.sortedCourt.location._long,
        };
      } else {
        return {
          lat: center[0],
          lng: center[1],
        };
      }
    },
  },
  watch: {
    defaultCenter(val) {
      if (val) {
        this.center = val;
      }
    },

    center: {
      handler(newCenter) {
        // Perform action when `this.center` changes
        // Call a method or perform any other actions
      },
      deep: true, // Enable deep watching for nested properties within `center`
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/fetchProfile");
    if (this.sortedCourt) {
      this.center = {
        lat: this.sortedCourt.location._lat,
        lng: this.sortedCourt.location._long,
      };
    }

    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo(this.center);
    });

    this.courtMarkersVal();
  },
  methods: {
    courtMarkersVal() {
      const markers = this.courts.data.map((court) => {
        return {
          position: {
            lat: court.location._lat,
            lng: court.location._long,
          },
          court,
          ...this.getTodayAvailability(court),
        };
      });
      this.markers = markers;
    },
    getZoomedOutPosition(latitude, longitude, zoomLevel) {
      // Adjust the latitude and longitude based on the desired zoom level
      const latitudeAdjusted = latitude - zoomLevel * 0.01;
      const longitudeAdjusted = longitude + zoomLevel * 0.01;

      return {
        lat: latitudeAdjusted,
        lng: longitudeAdjusted,
      };
    },
    handleMarkerClick(marker) {
      this.selectedMarker = marker;
      this.center = marker.position;
    },
    getMarkerIcon({ availability, court }) {
      let url = require("../../assets/markers/red.svg");
      if (court.isRaining) {
        url = require("../../assets/markers/blue.svg");
      } else if (this.getFreeCourt(court) >= 1) {
        url = require("../../assets/markers/green.svg");
      }
      return { url };
    },
    goToCourtDetail(court) {
      this.$router.push({
        name: "courtSchedule",
        params: {
          id: court.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info-window-content {
  color: black;
  padding: 6px;

  h3 {
    margin-bottom: 4px;
    cursor: pointer;
  }
}
</style>
