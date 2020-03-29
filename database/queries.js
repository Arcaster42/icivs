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
    const result = await db('civ_users').where({ email: userObj.email }).first()
    if (!result) return { err: 'Invalid E-Mail' }
    if (result) {
      const valid = await bcrypt.compare(userObj.password, result.pass_hash)
      if (!valid) return { err: 'Invalid Credentials' }
      if (valid) {
        delete result['pass_hash']
        return result
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

const getSchematics = async () => {
  try {
    const results = await db('civ_schematics')
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

const build = async (buildObj) => {
  try {
    const schematic = await db('civ_schematics').where({ tag: buildObj.tag }).first()
    if (!schematic) return { err: 'Schematic Error' }
    const user = await db('civ_users').where({ email: buildObj.email }).first()
    if (!user) return { err: 'User Error' }
    // Validate build limit
    const userBuildings = JSON.parse(user.buildings)
    if (userBuildings && userBuildings[buildObj.tag] && userBuildings[buildObj.tag] >= schematic.limit)
      return { err: 'Limit Reached' }
    // Validate build cost
    const schematicCost = schematic.cost
    for (const resource of Object.keys(schematicCost)) {
      if (user[resource] < schematicCost[resource])
        return { err: `Insufficient ${resource}.` }
    }
    // Deduct resources
    for (const resource of Object.keys(schematicCost)) {
      await db('civ_users').where({ email: buildObj.email }).decrement(resource, schematicCost[resource])
    }
    // Add to construction queue
    await db('civ_construction').insert({ civ_user: buildObj.email, civ_tag: buildObj.tag, civ_time: schematic.time })
    return { success: `Construction of ${schematic.title} started.` }
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getSchematics,
  cycleUpdate,
  build
}