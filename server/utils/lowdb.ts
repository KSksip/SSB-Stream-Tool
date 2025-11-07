import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { OverlayInfo } from '~~/types/overlayInfo'
import * as fs from 'fs'

const presetData: OverlayInfo = {
    setInfo: {
        round: "",
        bestOf: "",
    },
    player: [
        {
            name: "",
            prefix: "",
            score: 0,
            character: "",
            skin: "",
        },
        {
            name: "",
            prefix: "",
            score: 0,
            character: "",
            skin: "",
        },
    ],
}

export const db = new LowSync<OverlayInfo>(new JSONFileSync('storage.json'), presetData)
db.write()


//db.read()