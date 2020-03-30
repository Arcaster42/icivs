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
    for (const result of results)
      delete result['pass_hash']
    return results
  } catch (err) {
    console.log(err)
    return err
  }
}

const getUser = async (userObj) => {
  try {
    const result = await db('civ_users').where({ email: userObj.email }).first()
    if (!result) return { err: 'User Not Found' }
    if (result) {
      delete result['pass_hash']
      return result
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

const getUserConstruction = async (userObj) => {
  try {
    const results = await db('civ_construction').where({ civ_user: userObj.email }).join('civ_schematics', { 'civ_construction.civ_tag': 'civ_schematics.tag' })
    if (!results) return []
    if (results) {
      for (const result of results) {
        delete result['id']
        delete result['civ_user']
      }
      return results
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

const getAllConstruction = async () => {
  try {
    const results = await db('civ_construction')
    for (const result of results) {
      delete result['id']
      delete result['civ_user']
    }
    return results
  } catch (err) {
    console.log(err)
    return err
  }
}

const cycleConstruction = async () => {
  try {
    await db('civ_construction').decrement('civ_time', 1)
    const constructions = await db('civ_construction')
    for (const construction of constructions) {
      if (construction.civ_time < 1) {
        const tag = construction.civ_tag
        const email = construction.civ_user
        const user = await db('civ_users').where({ email }).first()
        let userBuildings = user.buildings
        if (!userBuildings) userBuildings = {}
        if (!userBuildings[tag]) userBuildings[tag] = 1
        else userBuildings[tag]++
        userBuildings = JSON.stringify(userBuildings)
        await db('civ_construction').where({ id: construction.id }).del()
        await db('civ_users').where({ email }).update({ buildings: userBuildings })
      }
    }
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
    const userBuildings = user.buildings
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
  getUser,
  getUserConstruction,
  getAllConstruction,
  cycleConstruction,
  getSchematics,
  cycleUpdate,
  build
}