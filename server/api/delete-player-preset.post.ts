import { playerPresetDB } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  delete playerPresetDB.data[body.presetName]
  playerPresetDB.write()

  return {
    data: playerPresetDB.data,
    keys: Object.keys(playerPresetDB.data)
  }
})