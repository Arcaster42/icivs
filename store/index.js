export const state = () => ({
  userObj: null
})

export const mutations = {
  SET_USER (state, userObj) {
    state.userObj = userObj
  }
}

export const actions = {
  async LOGIN ({ commit }, userObj) {
    const loginResponse = await this.$axios.post(`${process.env.api}/user/login`, { email: userObj.email, password: userObj.password })
    if (loginResponse.status === 202) {
      commit('SET_USER', loginResponse.data)
      return { success: true }
    } else {
      return { err: 'Login Error' }
    }
  }
}