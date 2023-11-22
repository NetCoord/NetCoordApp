<template>
  <div v-if="formCreateEvent">
    <div class="event-type-wrapper">
      <h2>Event Type</h2>
      <div>
        <label class="label">Pick-Up</label>
        <VueToggles
          height="30"
          width="60"
          checkedText=""
          uncheckedText=""
          checkedBg="#FF3464"
          uncheckedBg="lightgrey"
          :value="formCreateEvent.isPickUp"
          @click="formCreateEvent.isPickUp = !formCreateEvent.isPickUp"
        />
        <p>(Open Invite to All)</p>
      </div>
    </div>
    <div class="field">
      <ToggleGrid
        :options="sportOptions"
        :selectedOption="formCreateEvent.selectedSport"
        @selected="(opt) => formCreateEvent.selectedSport = opt"
      />
    </div>
    <div class="field">
      <ToggleGrid
        :options="genderOptions"
        :selectedOption="formCreateEvent.selectedGender"
        @selected="(opt) => formCreateEvent.selectedGender = opt"
      />
    </div>
    <div class="field">
      <label>Event Name</label>
      <input
        :class="['input', ($v.formCreateEvent.eventName.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Required"
        v-model="formCreateEvent.eventName"
      />
      <p v-if="$v.formCreateEvent.eventName.$error" class="help is-danger">This field is required</p>
    </div>
    <div class="field">
      <label>Start</label>
      <div class="date-grid">
        <date-picker v-model="formCreateEvent.startDate" placeholder="Required" type="date" :disabled-date="disabledRange"></date-picker>
        <date-picker v-model="formCreateEvent.startTime" placeholder="12:00" type="time" format="HH:mm"></date-picker>
      </div>
    </div>
    <div class="field">
      <label>End</label>
      <div class="date-grid">
        <date-picker v-model="formCreateEvent.endDate" placeholder="Required" type="date" :disabled-date="disabledRange"></date-picker>
        <date-picker v-model="formCreateEvent.endTime" placeholder="12:00" type="time" format="HH:mm"></date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import ToggleGrid from '@/components/ToggleGrid'

export default {
  props: ['clickedNext', 'currentStep'],
  mixins: [validationMixin],
  components: { ToggleGrid },
  data() {
    return {
      genderOptions: [
        { label: 'Men', value: 'Men' },
        { label: 'Ladies', value: 'Ladies' },
        { label: 'Mixed', value: 'Mixed' }
      ],
      sportOptions: [
        { label: 'Tennis', value: 'Tennis' },
        { label: 'Pickleball', value: 'Pickleball' }
      ]
    }
  },
  computed: {
    ...mapState('court', ['formCreateEvent'])
  },
  validations: {
    formCreateEvent: {
      eventName: {
        required
      },
      startDate: {
        required,
      },
      startTime: {
        required
      },
      endDate: {
        required,
      },
      endTime: {
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
  },
  methods: {
    disabledRange: function (date) {
      return date < new Date();
    }
  }
}
</script>

<style lang="scss" scoped>
.event-type-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.5em;
    margin-bottom: 0;
  }

  & > div {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 0.3rem;

    label {
      font-size: 1em;
      font-weight: 600;
    }

    p {
      font-size: 0.8em;
      grid-column: -1/1;
    }
  }
}
.field {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.2em;
  }
  input {
    height: 40px;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    padding: 0 8px;
    margin-top: 4px;
  }

  .date-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    gap: 1rem;

    .mx-datepicker {
      width: 100%;
    }
  }
}
</style>