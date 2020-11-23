import Vue from 'vue'
import Vuex from 'vuex'
import { API } from 'aws-amplify'

Vue.use(Vuex)

interface JoinRoomRequest {
  displayName: string;
  roomName: string;
}

export default new Vuex.Store({
  state: {
    displayName: null,
    roomName: null,
    handle: null,
    vsId: null,
    token: null,
  },
  mutations: {
    setUser (state, data) {
      state.displayName = data.displayName
      state.roomName = data.displayName
      state.handle = data.handle
      state.vsId = data.vsId
      state.token = data.token
    },
  },
  actions: {
    joinRoom ({ commit }, { displayName, roomName }: JoinRoomRequest) {
      return new Promise(((resolve) => {
        console.log('join room', displayName, roomName)
        API.post('RestApi', '/auth', {
          body: {
            displayName,
            room: roomName,
          },
        }).then((resp) => {
          console.log('response from api', resp)
          commit('setUser', {
            displayName,
            roomName,
            handle: resp.handle,
            vsId: resp.id,
            token: resp.token,
          })
          localStorage.setItem('token', resp.token)
          resolve()
        })
      }))
    },
  },
  modules: {
  },
})
