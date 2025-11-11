import { gameDataDB } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  gameDataDB.read()
  console.log(gameDataDB.data)
  
  return {
    data: gameDataDB.data[body.selectedGame].character
  }
})