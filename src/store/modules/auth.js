import { firestore } from "../../firebase";

const getInitialState = () => ({
  user: null,
  profile: null,
});

const state = getInitialState();

const mutations = {
  SET_VALUE(state, { name, payload }) {
    state[name] = payload;
  },
  UPDATE_PROPERTY(state, { name, payload }) {
    state[name] = { ...state[name], ...payload };
  },
};

const actions = {
  setUser({ commit }, payload) {
    commit("SET_VALUE", { name: "user", payload });
  },
  async fetchProfile({ commit, state }) {
    const userSnapshot = await firestore
      .collection("users")
      .doc(state.user.uid)
      .get();
    const userData = {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };
    commit("SET_VALUE", { name: "profile", payload: userData });
  },
};

const getters = {
  isLoggedIn(state) {
    return !!state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};

// "@vue/cli-plugin-pwa": "^4.5.17",
// "firebase": "^8.6.1",
