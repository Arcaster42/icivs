const moment = require('moment')
const { getAllUsers, cycleConstruction, cycleUpdate } = require('../database/queries')

const gameCycle = async () => {
  // Add Resources
  try {
    const allUsers = await getAllUsers()
    if (allUsers.length > 0) {
      for (const user of allUsers) {
        const buildings = user.buildings
        if (!buildings) continue
        if (buildings.farm) user.food += 5 * buildings.farm
        if (buildings.lumber_yard) user.wood += 5 * buildings.lumber_yard
        if (buildings.house) user.free_pop += 1 * buildings.house
        if (buildings.iron_mine) user.iron += 1 * buildings.iron_mine
        if (buildings.quarry) user.stone += 1 * buildings.quarry
        if (buildings.gold_mine) user.gold += 1 * buildings.gold_mine
        if (buildings.market) {
          user.free_pop += 1 * buildings.market
          user.money += 100 * buildings.market
        }
        if (buildings.blacksmith) user.arms += 1 * buildings.blacksmith
        
        cycleUpdate(user)
      }
    }
  } catch (err) {
    console.log(err)
  }

  // Cycle Construction
  try {
    await cycleConstruction()
  } catch (err) {
    console.log(err)
  }

  console.log(`${moment()} -- Cycle`)
}

module.exports = {
  gameCycle
}