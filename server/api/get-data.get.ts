import { db } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  db.read()
  return db.data
})