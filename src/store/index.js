import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
        customerName: '',
        crmNumber: '',
        phoneNumber: '',
        selectedService: '',
        disabledFor: '',
        selectedAction: '',
        customerNameError: '',
        crmError: '',
        phoneNumberError: '',
        selectedServiceError: '',
        reasonForDisableError: '',
    
    };
  },
  mutations: {
    SET_CUSTOMER_NAME(state, payload) {
      state.customerName = payload;
    },
    SET_CRM_NUMBER(state, payload) {
      state.crmNumber = payload;
    },
    SET_PHONE_NUMBER(state, payload) {
      state.phoneNumber = payload;
    },
    SET_SELECTED_SERVICE(state, payload) {
      state.selectedService = payload;
    },
    SET_DISABLED_FOR(state, payload) {
      state.disabledFor = payload;
    },
    SET_SELECTED_ACTION(state, payload) {
      state.selectedAction = payload;
    },
    SET_REQUESTED_SERVICE(state, payload){
        state.requestedService = payload;
    },
    SET_CUSTOMER_NAME_ERROR(state, payload) {
      state.customerNameError = payload;
    },
    SET_CRM_ERROR(state, payload) {
      state.crmError = payload;
    },
    SET_PHONE_NUMBER_ERROR(state, payload) {
      state.phoneNumberError = payload;
    },
    SET_SELECTED_SERVICE_ERROR(state, payload) {
      state.selectedServiceError = payload;
    },
    SET_REASON_FOR_DISABLE_ERROR(state, payload) {
      state.reasonForDisableError = payload;
    },
  },
  actions: {
    updateCustomerName({ commit }, payload) {
      commit('SET_CUSTOMER_NAME', payload);
    },
    updateCRMNumber({ commit }, payload) {
      commit('SET_CRM_NUMBER', payload);
    },
    updatePhoneNumber({ commit }, payload) {
      commit('SET_PHONE_NUMBER', payload);
    },
    updateSelectedService({ commit }, payload) {
      commit('SET_SELECTED_SERVICE', payload);
    },
    updateDisabledFor({ commit }, payload) {
      commit('SET_DISABLED_FOR', payload);
    },
    updateSelectedAction({ commit }, payload) {
      commit('SET_SELECTED_ACTION', payload);
    },
    updateRequestedService({commit}, payload){
        commit('SET_REQUESTED_SERVICE', payload)
    },
    updateCustomerNameError({ commit }, payload) {
      commit('SET_CUSTOMER_NAME_ERROR', payload);
    },
    updateCRMError({ commit }, payload) {
      commit('SET_CRM_ERROR', payload);
    },
    updatePhoneNumberError({ commit }, payload) {
      commit('SET_PHONE_NUMBER_ERROR', payload);
    },
    updateSelectedServiceError({ commit }, payload) {
      commit('SET_SELECTED_SERVICE_ERROR', payload);
    },
    updateReasonForDisableError({ commit }, payload) {
      commit('SET_REASON_FOR_DISABLE_ERROR', payload);
    },
  },
  getters: {
    customerName: (state) => state.customerName,
    crmNumber: (state) => state.crmNumber,
    phoneNumber: (state) => state.phoneNumber,
    selectedService: (state) => state.selectedService,
    disabledFor: (state) => state.disabledFor,
    selectedAction: (state) => state.selectedAction,
    requestedService: (state) => state.requestedService,
    customerNameError: (state) => state.customerNameError,
    crmError: (state) => state.crmError,
    phoneNumberError: (state) => state.phoneNumberError,
    selectedServiceError: (state) => state.selectedServiceError,
    reasonForDisableError: (state) => state.reasonForDisableError,
  },
});

export default store;