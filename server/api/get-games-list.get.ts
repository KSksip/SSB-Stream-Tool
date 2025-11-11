import { gameDataDB } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  gameDataDB.read()
  
  return {
    data: Object.keys(gameDataDB.data)
  }
})