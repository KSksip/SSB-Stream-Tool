import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { OverlayInfo, PlayerPresets } from '~~/types/overlayInfo'
import {GameData} from '~~/types/gamedata'

import { refreshGameData } from '../script/import-games'
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

export let gameDataDB: LowSync<GameData>
async function loadGame() {
    const GameDataPreset: GameData = await refreshGameData()
    gameDataDB = new LowSync<GameData>(new JSONFileSync('data/games.json'), GameDataPreset)
    gameDataDB.write() 
}
loadGame()



