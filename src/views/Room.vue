<template>
  <div class="about">
    <h1>Welcome {{ user.displayName }}</h1>
    <div class="grid">
      <div v-for="u in connectedUsers" v-bind:key="u.marker.toISOString()" class="user">
        <video :srcObject.prop="u.camera" autoplay muted></video>
        <audio :srcObject.prop="u.audio" v-if="u.audio"></audio>
        <p style="text-align: center" v-html="u.displayName"></p>
      </div>
    </div>
  </div>
</template>

<script>
import VSSDK from '@visualsignal/sdk'

export default {
  name: 'room',
  data () {
    return {
      sdk: null,
      connectedUsers: [],
    }
  },
  created () {
    this.sdk = new VSSDK(this.user.token)
    this.sdk.av.connection.on('authSuccess', async () => {
      await this.sdk.av.initialize()
      this.setupListeners()
      await this.sdk.av.consume((stream, user, appData) => {
        const { kind } = stream.getTracks()[0]
        console.log('Got a stream', stream, kind, user, appData)
        const newStream = {
          ...appData,
          user,
          marker: new Date(),
        }
        switch (kind) {
        case 'video':
          newStream.camera = stream
          break
        case 'audio':
          newStream.audio = stream
          break
        default:
          console.error('unsupported media stream received', stream)
        }
        this.addUser(newStream)
      })
      this.startBroadcasting()
    })
  },
  computed: {
    user () {
      return this.$store.state
    },
  },
  methods: {
    async startBroadcasting () {
      const appData = {
        idUser: this.user.handle,
        displayName: this.user.displayName,
      }
      const stream = await global.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      const { transportInfo } = await this.sdk.av.publish(stream, 'camera', appData)
      this.addUser({
        camera: stream,
        transportId: transportInfo.id,
        marker: new Date(),
        ...appData,
      })
    },
    addUser (userInfo) {
      const exists = this.connectedUsers.find((user) => user.idUser === userInfo.idUser)
      if (exists) {
        this.connectedUsers.splice(this.connectedUsers.indexOf(exists), 1)
      }
      this.connectedUsers.push({
        ...exists,
        ...userInfo,
      })
    },
    setupListeners () {
      this.sdk.av.connection.on('userJoin', ({ displayName }) => this.$toasted.success(`${displayName} joined the room`))
      this.sdk.av.connection.on('userLeave', ({ displayName }) => this.$toasted.success(`${displayName} left the room`))
    },
  },
}
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  grid-auto-rows: 1fr;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > * {
    background: rgba(0,0,0,0.1);
    border: 1px white solid;
  }
}
</style>
