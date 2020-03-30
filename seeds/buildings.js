const farmInfo = 'Generates food every cycle.'
const farmCost = JSON.stringify({
  wood: 10,
  free_pop: 5
})

const lumberYardInfo = 'Generates wood every cycle.'
const lumberYardCost = JSON.stringify({
  food: 20,
  free_pop: 5
})

const houseInfo = 'Provides free population growth.'
const houseCost = JSON.stringify({
  wood: 10
})

const ironMineInfo = 'Provides iron every cycle.'
const ironMineCost = JSON.stringify({
  wood: 15,
  free_pop: 10
})

const quarryInfo = 'Provides stone every cycle.'
const quarryCost = JSON.stringify({
  wood: 15,
  free_pop: 10
})

const goldMineInfo = 'Provides gold every cycle.'
const goldMineCost = JSON.stringify({
  wood: 20,
  free_pop: 15
})

const marketInfo = 'Improves free population growth and provides money every cycle.'
const marketCost = JSON.stringify({
  wood: 20
})

const blacksmithInfo = 'Provides arms every cycle.'
const blacksmithCost = JSON.stringify({
  wood: 15,
  iron: 5
})

exports.seed = function(knex) {
  return knex('civ_schematics').del()
    .then(function () {
      return knex('civ_schematics').insert([
        { tag: 'farm', title: 'Farm', info: farmInfo, cost: farmCost, time: 1, limit: 200 },
        { tag: 'lumber_yard', title: 'Lumber Yard', info: lumberYardInfo, cost: lumberYardCost, time: 1, limit: 100 },
        { tag: 'house', title: 'House', info: houseInfo, cost: houseCost, time: 1, limit: 100 },
        { tag: 'iron_mine', title: 'Iron Mine', info: ironMineInfo, cost: ironMineCost, time: 2, limit: 20 },
        { tag: 'quarry', title: 'Quarry', info: quarryInfo, cost: quarryCost, time: 2, limit: 20 },
        { tag: 'gold_mine', title: 'Gold Mine' , info: goldMineInfo, cost: goldMineCost, time: 2, limit: 10 },
        { tag: 'market', title: 'Market', info: marketInfo, cost: marketCost, time: 3, limit: 5 },
        { tag: 'blacksmith', title: 'Blacksmith', info: blacksmithInfo, cost: blacksmithCost, time: 3, limit: 10 }
      ])
    })
}
