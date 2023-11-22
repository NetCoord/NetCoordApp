<template>
  <div>
    <h1 class="heading">Legal Information</h1>
    <div class="legal-section">
      <h2>Terms of Use</h2>
      <div class="scrollable">
        <TermsOfUse />
      </div>
    </div>
    <div class="legal-section">
      <h2>Privacy Policy</h2>
      <div class="scrollable">
        <PrivacyPolicy />
      </div>
    </div>
  </div>
</template>

<script>
import PrivacyPolicy from '../components/legal/PrivacyPolicy'
import TermsOfUse from '../components/legal/TermsOfUse'

export default {
  name: 'Legal',
  components: { TermsOfUse, PrivacyPolicy }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.heading {
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 1rem;
}

.legal-section {
  margin-bottom: 2rem;
  padding: 0 1rem;

  h2 {
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 0.4rem;
  }
  .scrollable {
    border: 2px solid $primary;
    border-radius: 8px;
    padding: 1rem;
    max-height: 250px;
    overflow: scroll;
  }
}
</style>