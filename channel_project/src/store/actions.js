import * as types from './mutation-types'


export const netWorkError = function ({commit, state},error) {
  commit(types.NETWORK_ERROR, error)
}

export const showDialog = function ({commit, state},info) {
  commit(types.SHOW_DIALOG, info)
}


export const netWorkCode = function ({commit, state},code) {
  commit(types.NETWORK_CODE, code)
}



// export const selectPlay = function ({commit, state}, {list, index}) {
//   commit(types.SET_SEQUENCE_LIST, list)
//   if (state.mode === playMode.random) {
//     let randomList = shuffle(list)
//     commit(types.SET_PLAYLIST, randomList)
//     index = findIndex(randomList, list[index])
//   } else {
//     commit(types.SET_PLAYLIST, list)
//   }
//   commit(types.SET_CURRENT_INDEX, index)
//   commit(types.SET_FULL_SCREEN, true)
//   commit(types.SET_PLAYING_STATE, true)
// }
//
// export const deleteFavoriteList = function ({commit}, song) {
//   commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
// }
