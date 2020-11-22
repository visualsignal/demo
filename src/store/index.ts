import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface JoinRoomRequest {
  displayName: string;
  roomName: string;
}

export default new Vuex.Store({
  state: {
    displayName: '',
    roomName: '',
  },
  mutations: {
  },
  actions: {
    async joinRoom({ commit }, { displayName, roomName }: JoinRoomRequest) {
      console.log('join room', displayName, roomName);
    },
  },
  modules: {
  },
});
