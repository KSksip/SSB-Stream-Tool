import { db } from '../utils/lowdb'

const socket = new WebSocket('ws://localhost:3000/_ws')

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  //console.log(body)
  db.data = body
  db.write()

  socket.send('update')
})