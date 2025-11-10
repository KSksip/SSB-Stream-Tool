import { playerPresetDB } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  playerPresetDB.data[body.presetName] = body.data
  playerPresetDB.write()

  return {
    data: playerPresetDB.data,
    keys: Object.keys(playerPresetDB.data)
  }
})