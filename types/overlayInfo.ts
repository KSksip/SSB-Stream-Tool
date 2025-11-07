export type OverlayInfo = {
    setInfo: {
        round: string,
        bestOf: string,
    },
    player: [Player, ...Player[]]
}

type Player = {
    name: string,
    prefix: string,
    score: number,
    character: string,
    skin: string,
}