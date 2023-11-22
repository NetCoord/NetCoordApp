<template>
  <div class="footer">
    <div class="flex-between">
      <button @click="goHome" :disabled="disabled" class="cancel-btn footer-btn">Cancel</button>
      <button @click="submit" :disabled="disabled" class="submit-btn footer-btn">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-footer",
  props: {
    disabled: {
      type: Boolean
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' })
    },
    submit() {
      this.$emit('submit')
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variable";

.footer {
  margin-top: 24px;
  margin-bottom: 10px;
  padding: 0 1rem;

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      font-size: 1.25rem;
      margin-bottom: 5px;
    }

    .cus-input {
      width: 100%;
      padding: 10px 12px 9px;
      font-size: 1.1rem;
      border-radius: 8px;
      border: 2px solid $primary;

      &:focus {
        outline: none;
      }
    }
  }

  .footer-btn {
    display: inline-block;
    border: 0px;
    font-size: 1.6rem;
    text-transform: capitalize;
    padding: 10px 25px 9px;
    border-radius: 8px;
    cursor: pointer;

    &:disabled {
      opacity: 0.3;
    }

    &.cancel-btn {
      border: 3px solid #a5a5a5;
      background: transparent;
      border-radius: 24px;
      font-size: 1.3rem;
      color: #a5a5a5;
      padding: 8px 34px;
    }

    &.submit-btn {
      border: 3px solid $yellow-pink-gradient;
      background: $yellow-pink-gradient;
      border-radius: 24px;
      font-size: 1.3rem;
      color: #eeeeee;
      padding: 8px 34px;
    }
  }
}
</style>
