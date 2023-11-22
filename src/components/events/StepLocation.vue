<template>
  <div>
    <div class="event-type-wrapper">
      <h2>Select Park(s)</h2>
    </div>
    <div class="select-wrapper">
      <v-select
        v-model="formCreateEvent.selectedCourts"
        multiple
        label="name"
        :options="courtOptions"
      ></v-select>
    </div>
    <div v-for="selectedCourt in formCreateEvent.selectedCourts" :key="selectedCourt.id" class="court-data">
      <h3>{{ selectedCourt.name }}</h3>
      <div v-if="selectedCourt.courtNum" class="court-wrapper">
        <div v-for="i in selectedCourt.courtNum" :key="i">
          <label class="checkbox-container">{{ i }}
            <input type="checkbox" @change="(e) => handleChangeCourtNum(e, selectedCourt.id, i)">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
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
  data() {
    return {
      form: {
        
      }
    }
  },
  computed: {
    ...mapState('court', ['courts', 'formCreateEvent']),
    courtOptions () {
      return this.courts.data.sort((a, b) => a.name > b.name ? 1 : -1)
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
  },
  methods: {
    handleChangeCourtNum (evt, courtId, courtNum) {
      const checked = evt.target.checked

      if (checked) {
        if (!this.formCreateEvent.selectedCourtNumbers[courtId]) {
          this.formCreateEvent.selectedCourtNumbers[courtId] = {}
        }
        if (!this.formCreateEvent.selectedCourtNumbers[courtId][courtNum]) {
            this.formCreateEvent.selectedCourtNumbers[courtId][courtNum] = []
        }
      } else {
        delete this.formCreateEvent.selectedCourtNumbers[courtId][courtNum]
        if (Object.keys(this.formCreateEvent.selectedCourtNumbers[courtId]).length === 0) {
          delete this.formCreateEvent.selectedCourtNumbers[courtId]
        }
      }
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
.select-wrapper {
  & ::v-deep .vs__dropdown-toggle {
    background: white;
  }
}

.court-data {
  margin-top: 1rem;
}

.court-wrapper {
  display: flex;
  position: relative;
  margin-top: 0.5rem;
  flex-wrap: wrap;

  & > div {
    margin: 0.4rem;
  }
}

/* Customize the label (the container) */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
  background-color: #FF3464;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
