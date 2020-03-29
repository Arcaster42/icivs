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
  },
  async REGISTER ({ commit }, userObj) {
    try {
      const registerResponse = await this.$axios.post(`${process.env.api}/user/registration`, { email: userObj.email, password: userObj.password })
      if (registerResponse.status === 201) {
        return registerResponse.data
      } else {
        return { err: 'Registration Error' }
      }
    } catch (err) {
      if (err.response.status === 409) return err.response.data
      console.log(err)
    }
  }
}