<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>VisualSignal Demo Application</h1>
    <p>Welcome to the VisualSignal demo application.</p>
    <p>Enter a display name and room name to begin.</p>
    <p>To connect with someone, have the come to the same url as you're on now and enter a matching
      room name</p>
    <form @submit.prevent="submitForm" class="form">
      <div>
        <label for="displayName">Display Name</label>
        <input type="text" id="displayName" v-model="form.displayName">
      </div>
      <div>
        <label for="roomName">Room Name</label>
        <input type="text" id="roomName" v-model="form.roomName">
      </div>
      <button type="submit">Join Room</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      form: {
        displayName: '',
        roomName: '',
      },
    };
  },
  methods: {
    ...mapActions(['joinRoom']),
    submitForm() {
      this.joinRoom(this.form).then(() => {
        this.$router.push({
          name: 'room',
          params: { id: this.form.roomName },
        })
          .catch((e) => console.error(e));
      });
    },
  },
};
</script>

<style lang="scss">

.form {
  max-width: 40%;
  margin: 0 auto;

  input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
}

</style>
