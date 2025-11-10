export type OverlayInfo = {
    setInfo: {
        phase: string,
        match: string,
        bestOf: number,
    },
    player: [Player, Player]
}

export type Player = {
    losers: boolean,
    name: string,
    prefix: string,
    score: number,
    character: string,
    skin: string,
    pronouns: string, 
    country: string,
    region: string,
}

export type PlayerPresets = { [key: string ]: Player, }