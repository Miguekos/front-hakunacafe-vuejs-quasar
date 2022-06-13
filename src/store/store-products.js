import {api} from "boot/axios";

const state = {
  products: [],
  productsById: {},
  productsByName: []
};

const mutations = {
  setProducts(state, payload) {
    state.products = payload;
  },
  setProductsById(state, payload) {
    state.productsById = payload;
  },
  setProductsByName(state, payload) {
    state.productsByName = payload;
  },
};

const actions = {
  async call_products({commit}) {
    const response = await api.get(
      `/apihakuna/productos`
    );
    commit("setProducts", response.data);
  },
  async call_products_by_id({commit}, payload) {
    const response = await api.get(
      `/apihakuna/productos/${payload}`
    );
    commit("setProductsById", response.data);
  },
  async call_products_by_name({commit}, payload) {
    const response = await api.get(
      `/apihakuna/productos/name/${payload}`
    );
    commit("setProductsByName", response.data);
  },
  async call_products_create({commit}, payload) {
    const response = await api.post(`/apihakuna/productos`, payload);
    return response.data
  },
};

const getters = {
  getProducts(state) {
    return state.products
  },
  getProductsById(state) {
    return state.productsById
  },
  getProductsByName(state) {
    return state.productsByName
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
