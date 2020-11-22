<template>
  <div class="about">
    <h1>Welcome {{ user.displayName }}</h1>
  </div>
</template>

<script>
import VSSDK from '@visualsignal/sdk';

export default {
  name: 'room',
  data() {
    return {
      sdk: null,
    };
  },
  created() {
    this.sdk = new VSSDK(this.user.token);
    this.sdk.av.connection.on('authSuccess', async () => {
      console.log('authenticated with conductor!');
    });
  },
  computed: {
    user() {
      return this.$store.state;
    },
  },
};
</script>
