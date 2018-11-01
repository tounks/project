import * as types from './mutation-types'

const mutations = {
  [types.NETWORK_ERROR](state, error) {
    state.netWorkError = error
  },
  [types.SHOW_DIALOG](state, show) {
    state.showDialog = show
  },
  [types.NETWORK_CODE](state, code) {
    state.netWorkCode = code
  },
}

export default mutations
