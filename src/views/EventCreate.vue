<template>
  <div class="event-create-page">
    <h1>New Event</h1>
    <horizontal-stepper
      :steps="eventCreateSteps"
      @completed-step="completeStep"
      @active-step="isStepActive"
      @stepper-finished="submit"
    />
  </div>
</template>

<script>
import HorizontalStepper from 'vue-stepper';
import StepBasicInfo from '../components/events/StepBasicInfo';
import StepLocation from '../components/events/StepLocation';
import StepRoster from '../components/events/StepRoster';
import StepReview from '../components/events/StepReview';

export default {
  components: {
    HorizontalStepper
  },
  data() {
    return {
      eventCreateSteps: [
        {
          icon: 'info',
          name: 'info',
          title: 'Basic Info',
          component: StepBasicInfo,
          completed: false
        },
        {
          icon: 'place',
          name: 'place',
          title: 'Location',
          component: StepLocation,
          completed: false
        },
        {
          icon: 'people',
          name: 'rooster',
          title: 'Rooster',
          component: StepRoster,
          completed: false
        },
        {
          icon: 'visibility',
          name: 'review',
          title: 'Review',
          component: StepReview,
          completed: false
        }
      ]
    }
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.eventCreateSteps.forEach((step) => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      })
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.eventCreateSteps.forEach((step) => {
        if (step.name === payload.name) {
          if(step.completed === true) {
            step.completed = false;
          }
        }
      })
    },
    // Executed when @stepper-finished event is triggered
    submit() {
      this.$store.dispatch('court/createEvent')
        .then(() => {
          this.$toast.success('New event has been created.')
          this.$router.push({
            name: 'home'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/scss/variable";

.event-create-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 1.5em;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  & ::v-deep .stepper-box {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    height: 100%;

    .top {
      .divider-line {
        top: 25px;
      }
      .steps-wrapper {
        .step {
          .step-title h4 {
            color: white;
          }
          .circle {
            background-color: transparent;
              i {
              padding: 0.3rem;
              background-color: $primary;
            }
          }
        }
      }
    }
    .content {
      padding: 1rem;
      overflow: scroll;
      height: 100%;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      &::-webkit-scrollbar {
        display: none;
      }
    }
    .bottom {
      margin-top: auto;
      padding: 1rem;

      .stepper-button.next {
        background-color: $primary;
      }
    }
  }
}
</style>
