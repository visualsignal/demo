<template>
  <div class="about">
    <h1>Welcome {{ user.displayName }}</h1>
  </div>
</template>

<script>
export default {
  name: 'room',
  computed: {
    user() {
      return this.$store.state;
    },
  },
};
</script>
