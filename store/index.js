export const state = () => ({
  userObj: null,
  construction: null
})

export const getters = {
  GET_USER_EMAIL: (state) => {
    return state.userObj.email
  },
  GET_USER_RESOURCES: (state) => {
    const userObj = {}
    Object.assign(userObj, state.userObj)
    delete userObj['email']
    delete userObj['token']
    delete userObj['join_date']
    delete userObj['buildings']
    return userObj
  },
  GET_USER_BUILDINGS: (state) => {
    return state.userObj.buildings
  },
  GET_USER_CONSTRUCTION: (state) => {
    return state.construction
  }
}

export const mutations = {
  SET_USER (state, userObj) {
    state.userObj = userObj
  },
  SET_CONSTRUCTIONS (state, constructions) {
    state.construction = constructions
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
  async USER ({ commit, state }) {
    try {
      const userResponse = await this.$axios.get(`${process.env.api}/game/user`, { params: { email: state.userObj.email } })
      if (userResponse.status === 200)
        commit('SET_USER', userResponse.data)
    } catch (err) {
      console.log(err)
      return err
    }
  },
  async CONSTRUCTION ({ commit, state }) {
    console.log('Action')
    try {
      const constructionResponse = await this.$axios.get(`${process.env.api}/game/build`, { params: { email: state.userObj.email } })
      if (constructionResponse.status === 200) {
        commit('SET_CONSTRUCTIONS', constructionResponse.data)
        return { success: true }
      }
      else return { err: 'Retrieval Error' }
    } catch(err) {
      console.log(err)
      return err
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
  async BUILD ({ commit }, buildObj) {
    try {
      const buildResponse = await this.$axios.post(`${process.env.api}/game/build`, buildObj)
      return buildResponse.data
    } catch (err) {
      console.log(err)
      return err
    }
  }
}