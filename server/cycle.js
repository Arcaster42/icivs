const { getAllUsers, cycleUpdate } = require('../database/queries')

const gameCycle = async () => {
  try {
    const allUsers = await getAllUsers()
    if (allUsers.length > 0) {
      for (const user of allUsers) {
        const buildings = JSON.parse(user.buildings)
        if (!buildings) continue
        if (buildings.farm) user.food += 5 * buildings.farm
        if (buildings.house) user.free_pop += 1 * buildings.house
        if (buildings.iron_mine) user.iron += 1 * buildings.iron_mine
        if (buildings.quarry) user.quarry += 1 * buildings.quarry
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
}

module.exports = {
  gameCycle
}