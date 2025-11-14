import { GameData } from '~~/types/gamedata'
import * as fs from 'fs'
import { promisify } from 'util'

export async function refreshGameData(): Promise<GameData>{
    const readdir = promisify(fs.readdir)

    const gamedata: GameData = {}

    const games = await readdir('data/games')
    
    for(const game of games){
        const characters = await readdir('data/games/' + game + '/stock-icons')
        
        gamedata[game] = {}

        for(const character of characters){
            const skins = await readdir('data/games/' + game + '/stock-icons/' + character )
            if(gamedata[game].character){
                gamedata[game].character[character] = {"skins": skins}
            }
        }
    }

    return gamedata
}