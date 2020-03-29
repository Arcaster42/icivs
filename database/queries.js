require('dotenv').config()
const environment = process.env.NODE_ENV || 'development'
const dbConfig = require('../knexfile')[environment]
const db = require('knex')(dbConfig)
const bcrypt = require('bcrypt')

const registerUser = async (userObj) => {
  try {
    const results = await db('civ_users').where({ email: userObj.email })
    if (results.length > 0) return { err: 'E-Mail Unavailable' }
    if (results.length === 0) {
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(userObj.password, 10, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
      await db('civ_users').insert({ email: userObj.email, pass_hash: hash })
      return { success: true }
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

const loginUser = async (userObj) => {
  try {
    const results = await db('civ_users').where({ email: userObj.email })
    if (results.length === 0) return { err: 'Invalid E-Mail' }
    if (results.length > 0) {
      const valid = await bcrypt.compare(userObj.password, results[0].pass_hash)
      if (!valid) return { err: 'Invalid Credentials' }
      if (valid) {
        return results[0]
      }
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

const getAllUsers = async () => {
  try {
    const results = await db('civ_users')
    return results
  } catch (err) {
    console.log(err)
    return err
  }
}

const cycleUpdate = async (userObj) => {
  try {
    const results = await db('civ_users').where({ email: userObj.email }).update(userObj)
    console.log(results)
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  cycleUpdate
}