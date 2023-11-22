<template>
  <div id="app">
    <AppLayout>
      <PWAPrompt />
      <vue-page-transition name="fade-in-up" class="vpt">
        <router-view />
      </vue-page-transition>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import PWAPrompt from "@/components/PWAPrompt";

export default {
  name: "app",
  components: { AppLayout, PWAPrompt },
};
</script>

<style lang="scss" scoped>
.vpt {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
