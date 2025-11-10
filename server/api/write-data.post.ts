import { db } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  db.data = body
  db.write()

  return { written: true }
})