import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { OverlayInfo, PlayerPresets } from '~~/types/overlayInfo'
import * as fs from 'fs'

const presetData: OverlayInfo = {
    setInfo: {
        phase: "",
        match: "",
        bestOf: 0,
    },
    player: [
        {
            losers: false,
            name: "",
            prefix: "",
            score: 0,
            character: "",
            skin: "",
            pronouns: "",
            country: "",
            region: "",
        },
        {
            losers: false,
            name: "",
            prefix: "",
            score: 0,
            character: "",
            skin: "",
            pronouns: "",
            country: "",
            region: "",
        },
    ],
}

export const db = new LowSync<OverlayInfo>(new JSONFileSync('data/storage.json'), presetData)
db.write()

const PlayerPresetData: PlayerPresets =  {}

export const playerPresetDB = new LowSync<PlayerPresets>(new JSONFileSync('data/players.json'), PlayerPresetData)
playerPresetDB.write()