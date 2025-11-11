import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { OverlayInfo, PlayerPresets } from '~~/types/overlayInfo'
import {GameData} from '~~/types/gamedata'
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

const GameDataPreset: GameData =  {
    "Melee": {
        character: {
            "Marth": {
                skins: ['green', 'neutral', 'black', 'red', 'white']
            },
            "Fox": {
                skins: ['blue', 'neutral', 'red', 'green']
            }
        }
    }
}
export const gameDataDB = new LowSync<GameData>(new JSONFileSync('data/games.json'), GameDataPreset)
gameDataDB.write()

