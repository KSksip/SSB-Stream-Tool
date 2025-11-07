import { db } from '../utils/lowdb'

export default defineEventHandler(async (event) => {
  db.read()
  //console.log(db.data)
  return db.data
})