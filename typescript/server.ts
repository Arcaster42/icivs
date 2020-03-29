export interface UserAuth {
  email: string
  password: string
}

export interface User {
  email: string
  join_date: Date
  token?: string
  buildings: JSON
  money: number
  free_pop: number
  food: number
  wood: number
  iron: number
  stone: number
  gold: number
  arms: number
}

export interface QueryLogin {
  err?: string | Error
  email?: string
}

export interface QueryRegister {
  err?: string | Error
  success?: string
}