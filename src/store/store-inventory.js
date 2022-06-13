import {api} from "boot/axios";

const state = {
  inventories: [],
  inventoryById: [],
  productosToSell: []
};

const mutations = {
  setProductosToSell(state, payload) {
    state.productosToSell.push(payload);
  },
  setProductosToSell_clean(state) {
    state.productosToSell = [];
  },
  setInventaries(state, payload) {
    state.inventories = payload;
  },
  setInvetaryById(state, payload) {
    state.inventoryById = payload;
  },
};

const actions = {
  async call_productosToSell({commit}, payload) {
    commit("setProductosToSell", payload);
  },
  async call_productosToSell_clean({commit}) {
    commit("setProductosToSell_clean");
  },
  async call_inventories({commit}) {
    const response = await api.get(
      `/apihakuna/inventarios`
    );
    commit("setInventaries", response.data);
  },
  async call_inventories_by_id({commit}, payload) {
    const response = await api.get(
      `/apihakuna/inventarios/producto/${payload}`
    );
    commit("setInvetaryById", response.data);
  },
  async call_inventories_create({commit}, payload) {
    const response = await api.post(`/apihakuna/inventarios`, payload);
    return response.data
  },
};

const getters = {
  getInvetary(state) {
    return state.inventories
  },
  getInvetaryById(state) {
    return state.inventoryById
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
