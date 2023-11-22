<template>
  <div>
    <h1 class="heading">More</h1>
    <div>
      <section class="more-section">
        <div class="list-item" @click="goTo('https://anc.apm.activecommunities.com/wcscparksandrec/activity/search?onlineSiteId=0&activity_select_param=2&activity_ke')">
          <p>League Signups</p>
          <font-awesome-icon icon="fa-solid fa-trophy" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="goTo('https://anc.apm.activecommunities.com/wcscparksandrec/reservation/search?facilityTypeIds=37')">
          <p>Reserve a Court</p>
          <font-awesome-icon icon="fa-solid fa-list-check" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="goTo('https://forms.gle/NXRVSpruVdjksDfb9')">
          <p>Racket Stringing</p>
          <img src="@/assets/images/racquet.png" alt="" />
        </div>
      </section>
      <section class="social-section">
        <div class="list-item" @click="$router.push({ name: 'legal'})">
          <p>Legal Information</p>
          <font-awesome-icon icon="fa-solid fa-scale-balanced" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="goTo('https://www.buymeacoffee.com/NetCoord')">
          <p>Donate</p>
          <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="handleShare">
          <p>Share</p>
          <font-awesome-icon icon="fa-solid fa-share-nodes" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="goTo('https://www.instagram.com/netcoordapp/')">
          <p>Social</p>
          <font-awesome-icon icon="fa-solid fa-hashtag" />
        </div>
        <div class="separator" />
        <div class="list-item" @click="goTo('https://shop.netcoord.com')">
          <p>Shop</p>
          <font-awesome-icon icon="fa-solid fa-bag-shopping" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '../firebase'

export default {
  name: 'More',
  data () {
    return {
      loading: true,
      loggingOut: false
    }
  },
  computed: {
    ...mapState('auth', ['profile']),
    webShareApiSupported() {
      return navigator.share
    }
  },
  async mounted () {
    await this.$store.dispatch('auth/fetchProfile')
    this.loading = false
  },
  methods: {
    handleShare () {
      if (this.webShareApiSupported) {
         navigator.share({
          title: 'Netcoord',
          text: 'Join me on NetCoord for better tennis coordination in The Woodlands!',
          url: 'https://app.netcoord.com/'
        })
      } else {
        navigator.clipboard.writeText(
          `Join me on NetCoord for better tennis coordination in The Woodlands!\nhttps://app.netcoord.com/`
        );
        this.$toast.success('Share text has been copied to clipboard.')
      }
    },
    goTo (url) {
      window.open(url, '_blank');
    },
    handleResetPassword () {
    },
    async handleLogout () {
      this.loggingOut = true
      await auth.signOut();
      this.loggingOut = false

      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/variable";

.heading {
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 1rem;
}

.more-section,
.social-section {
  background: rgb(218,217,217);
  padding: 0 1rem;

  .separator {
    height: 1px;
    width: 100%;
    background-color: $primary;
  }
}

.social-section {
  margin-top: 1rem;
  margin-bottom: 3rem;

  .badge {
    width: 1.5rem;
    height: 1.5rem;
    background-color: $primary;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;    
  }
}

.list-item {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
  gap: 1rem;
  color: $primary;
  padding: 0.6rem;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
  p {
    font-weight: 600;
    color: black;
  }
  span {
    font-size: 0.9em;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button {
    background: transparent;
    border: none;
    font-weight: 500;
    color: $primary;
  }
  .dot-wrapper {
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 0.8rem;
    gap: 0.8rem;
    width: fit-content;
    align-items: center;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $primary;
  }
}
.btn-logout {
  border: 2px solid $primary;
  border-radius: 2rem;
  background: transparent;
  color: $primary;
  padding: 0.6rem 3rem;
  margin: 0 auto;
  display: flex;
  font-size: 0.9em;
  min-height: 2.5rem;
}
</style>