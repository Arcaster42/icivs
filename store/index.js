export const state = () => ({
  userObj: null
})

export const getters ={
  GET_USER_RESOURCES: (state) => {
    const userObj = {}
    Object.assign(userObj, state.userObj)
    delete userObj['email']
    delete userObj['token']
    delete userObj['join_date']
    delete userObj['buildings']
    return userObj
  }
}

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
  async LOGOUT ({ commit }) {
    commit('SET_USER', null)
    return { success: 'Logged Out' }
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
  },
  async SCHEMATICS () {
    try {
      const schematicResponse = await this.$axios.get(`${process.env.api}/game/schematics`)
      return schematicResponse.data
    } catch (err) {
      console.log(err)
      return err
    }
  },
  async BUILD () {
    try {

    } catch (err) {

    }
  }
}