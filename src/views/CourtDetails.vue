<template>
  <div class="content">
    <moon-loader v-if="courts.loading" color="white" class="fixed-center" />
    <div v-else-if="selectedCourt" class="detail-box-container">
      <court-header :court="selectedCourt" />
      <div class="detail">
        <div class="detail_header">
          <div class="detail_header_count">
            <h1>{{ selectedCourt.courtNum }}</h1>
            <span>Tennis Courts</span>
          </div>
          <div class="detail_header_feature">
            <div v-for="(feature, idx) in features" :key="idx">
              <span>{{ feature.label }}</span>
              <font-awesome-icon
                :icon="`fa-solid ${feature.value ? 'fa-thumbs-up' : 'fa-thumbs-down'}`"
                :class="{'active': feature.value}"
              />
            </div>
          </div>
        </div>
        <div class="detail_map">
          <GmapMap
            :center="center"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 200px"
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
              :clickable="false"
              :draggable="false"
              :icon="{ url: require('../assets/marker.svg') }"
              @click="center = m.position"
            />
          </GmapMap>
        </div>
        <div class="detail_action">
          <button @click="handleGetDirection">Get Directions</button>
          <button @click="handleReserveCourt">Reserve Court</button>
          <button @click="handleReport">Report Maintenance Issue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "../components/BackButton";
import CourtMixin from '../mixins/court-mixin';
import CourtHeader from "../components/CourtHeader";

export default {
  name: "court-details",
  mixins: [CourtMixin],
  components: { BackButton, CourtHeader },
  computed: {
    center () {
      if (this.selectedCourt) {
        return {
          lat: this.selectedCourt.location._lat,
          lng: this.selectedCourt.location._long
        }
      }
      return null
    },
    markers () {
      return !this.center ? [] : [{ position: this.center }]
    },
    features () {
      return [
        {
          label: 'Lights',
          value: !!this.selectedCourt.lights
        },
        {
          label: 'Restrooms',
          value: !!this.selectedCourt.bathroom
        },
        {
          label: 'Pickleball Lines',
          value: !!this.selectedCourt.pickleballLines
        }
      ]
    }
  },
  methods: {
    handleGetDirection () {
      const directionUrl = `https://maps.google.com/maps?saddr=&daddr=${this.center.lat},${this.center.lng}&sensor=TRUE`;
      window.open(directionUrl);
    },
    handleReserveCourt () {
      window.open('https://anc.apm.activecommunities.com/wcscparksandrec/reservation/search?facilityTypeIds=37');
    },
    handleReport () {
      window.open('https://www.thewoodlandstownship-tx.gov/1252/Report-a-Concern', '_blank');
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.detail-box-container {
  padding-top: 20px;
}
.detail {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  &_header {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 4px 8px;

    &_count {
      text-align: center;

      h1 {
        font-size: 3em;
        font-weight: 700;
      }
      span {
        font-size: 1.3em;
      }
    }

    &_feature {
      font-size: 1.2em;
      display: grid;
      grid-gap: 4px;
      margin-top: auto;
      margin-bottom: auto;

      & > div {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 10px;
        text-align: right;

        svg {
          color: #868686;

          &.active {
            color: $primary;
          }
        }
      }
    }
  }

  &_action {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding: 0 20px;

    button {
      padding: 14px;
      background: transparent;
      border-radius: 30px;
      font-size: 1.2em;

      &:nth-of-type(1) {
        border: 2px solid #4face9;
        color: #4face9;
      }
      &:nth-of-type(2) {
        border: 2px solid #eb4967;
        color: #eb4967;
      }
      &:nth-of-type(3) {
        border: 2px solid #ceb14e;
        color: #ceb14e;
      }
    }
  }
}
</style>
