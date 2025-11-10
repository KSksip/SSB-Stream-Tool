import { playerPresetDB } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  playerPresetDB.read()
  
  return {
    data: playerPresetDB.data,
    keys: Object.keys(playerPresetDB.data)
  }
})