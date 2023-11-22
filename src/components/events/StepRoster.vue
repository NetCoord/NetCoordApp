<template>
  <div>
    <div class="event-type-wrapper">
      <h2>Assign Players</h2>
    </div>
    <div
      v-for="selectedCourt in formCreateEvent.selectedCourts"
      :key="selectedCourt.id"
    >
      <div
        v-for="courtNum in Object.keys(formCreateEvent.selectedCourtNumbers[selectedCourt.id])"
        :key="courtNum"
        class="court-button"
        @click="handleSelect(selectedCourt.id, courtNum)"
      >
        <h4>{{ selectedCourt.name }} {{ courtNum }}</h4>
      </div>
    </div>
    <modal name="player-select-modal">
      <div class="player-select-modal-wrapper">
        <div class="select-wrapper">
          <v-select
            multiple
            label="name"
            :options="rosters"
            placeholder="Select Users"
            :value="existingPlayers"
            @input="handleSelectPlayer"
          ></v-select>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  props: ['clickedNext', 'currentStep'],
  mixins: [validationMixin],
  components: { },
  data () {
    return {
      activeCourtWithNumber: [],
      rosters: [],
      repopulateExisting: false
    }
  },
  computed: {
    ...mapState('court', ['courts', 'formCreateEvent']),
    existingPlayers () {
      if (this.repopulateExisting) {
        this.repopulateExisting = false
      }
      if (!this.activeCourtWithNumber.length) {
        return []
      }

      const courtId = this.activeCourtWithNumber[0]
      const courtNum = this.activeCourtWithNumber[1]
      return this.formCreateEvent.selectedCourtNumbers[courtId][courtNum]
    }
  },
  validations: {
    formCreateEvent: {
      selectedCourts: {
        required
      }
    }
  },
  watch: {
    $v: {
      handler: function (val) {
        if(!val.$invalid) {
          this.$emit('can-continue', {value: true});
        } else {
          this.$emit('can-continue', {value: false});
        }
      },
      deep: true
    },
    clickedNext(val) {
      if(val === true) {
        this.$v.formCreateEvent.$touch();
      }
    }
  },
  mounted() {
    if(!this.$v.$invalid) {
      this.$emit('can-continue', {value: true});
    } else {
      this.$emit('can-continue', {value: false});
    }
    this.$store.dispatch('court/fetchRosters', {
      sport: this.formCreateEvent.selectedSport,
      gender: this.formCreateEvent.selectedGender
    }).then((rosters) => {
      this.rosters = rosters
    })
  },
  methods: {
    handleSelect (courtId, courtNum) {
      this.activeCourtWithNumber = [courtId, courtNum]
      this.$modal.show('player-select-modal')
    },
    handleSelectPlayer (val) {
      const courtId = this.activeCourtWithNumber[0]
      const courtNum = this.activeCourtWithNumber[1]
      this.formCreateEvent.selectedCourtNumbers[courtId][courtNum] = val
      this.repopulateExisting = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/variable";

.event-type-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.5em;
    margin-bottom: 0;
  }
}
.select-wrapper {
  & ::v-deep .vs__dropdown-toggle {
    background: white;
  }
}
.court-button {
  margin-top: 1rem;
  background: transparent;
  border: 1px solid #c2c2c2;
  padding: 1rem 1rem;
  color: white;

  &.selected {
    background: #c2c2c2;
  }

  h4 {
    font-weight: 600;
  }
}
.player-select-modal-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}
</style>
