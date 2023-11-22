<template>
  <div>
    <div>
      <div class="heading">
        <h2>Help us make<br/>NetCoord even better.</h2>
        <h2>What's happening at this park?</h2>
      </div>
      <weather-toggle v-model="isRaining" />
    </div>
    <div>
      <h2>Number of Courts free right now</h2>
      <num-picker v-model="freeCourt" :options="options" />
    </div>
    <app-footer :disabled="!court" @submit="handleSubmit" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppFooter from "../components/AppFooter";
import NumPicker from "./NumPicker.vue";
import WeatherToggle from "./WeatherToggle.vue";

export default {
  name: 'court-count-view',
  components: { AppFooter, NumPicker, WeatherToggle },
  props: {
    court: {
      type: Object
    }
  },
  data() {
    return {
      freeCourt: null,
      courtNum: null,
      isRaining: null
    };
  },
  computed: {
    options () {
      if (this.isRaining) {
        return [{ value: 0, name: "Wet" }]
      } else {
        return [...Array(this.courtNum + 1).keys()] 
          .sort((a, b) => a > b ? -1 : 1)
          .map(i => ({ label: i, value: i, name: i }))
      }
    }
  },
  watch: {
    court (val) {
      this.refreshCourt()
    }
  },
  mounted () {
    this.refreshCourt();
  },
  methods: {
    ...mapActions('court', ['updateCourt']),
    refreshCourt () {
      const { courtNum, freeCourt, isRaining } = this.court || {}
      this.courtNum = courtNum || 0
      this.freeCourt = freeCourt || 0
      this.isRaining = isRaining || false
    },
    async handleSubmit () {
      if (this.court) {
        const payload = {
          id: this.court.id,
          isRaining: this.isRaining,
          freeCourt: this.isRaining ? 0 : this.freeCourt
        }
        await this.updateCourt(payload)
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  text-align: center;
  margin-bottom: 10px;

  h2 {
    margin-top: 4px;
    margin-bottom: 4px;
  }
}

h2 {
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 18px;
  text-align: center;
  line-height: 1.3;
  margin-left: auto;
  margin-right: auto;
}
</style>
