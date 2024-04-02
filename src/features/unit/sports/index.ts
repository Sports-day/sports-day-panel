import {Sport} from "@/src/models/SportModel";
import {Team} from "@/src/models/TeamModel";
import {Match} from "@/src/models/MatchModel";
import {Game} from "@/src/models/GameModel";
import {Image} from "@/src/models/ImageModel";
import {Location} from "@/src/models/LocationModel";
import {useFetchImages} from "@/src/features/images/hook";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchSport} from "@/src/features/sports/hook";
import {useFetchGames} from "@/src/features/games/hook";
import {useFetchMatches} from "@/src/features/matches/hook";
import {useFetchAllInformation} from "@/src/features/information/hook";
import {Information} from "@/src/models/InformationModel";

export type SportDataType = {
    refresh: VoidFunction
    isFetching: boolean
    //  data
    sport: Sport
    //  image
    image: Image | undefined
    //  belong to sport
    games: Game[]
    //  belong to games
    teams: Team[]
    //  belong to games
    matches: Match[]
    locations: Location[]
    informationList: Information[]
}

export const useFetchSportData = (sportId: number) => {
    //  hook
    const {sport, isFetching: isFetchingSport, refresh: refreshSport} = useFetchSport(sportId)
    const {images, isFetching: isFetchingImages, refresh: refreshImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations, refresh: refreshLocations} = useFetchLocations()
    const {teams, isFetching: isFetchingTeams, refresh: refreshTeams} = useFetchTeams()
    const {games, isFetching: isFetchingGames, refresh: refreshGames} = useFetchGames()
    const {matches, isFetching: isFetchingMatches, refresh: refreshMatches} = useFetchMatches()
    const {allInformation, isFetching: isFetchingInformation} = useFetchAllInformation()
    //  state
    let filteredGames: Game[] = []
    let filteredTeams: Team[]
    let filteredMatches: Match[] = []

    //  games
    filteredGames = games.filter((game: Game) => {
        return game.sportId === sportId
    })

    //  matches
    filteredMatches = matches.filter((match: Match) => {
        return filteredGames.some((game: Game) => {
            return game.id === match.gameId
        })
    })

    //  teams
    filteredTeams = teams.filter((team: Team) => {
        return filteredMatches.some((match: Match) => {
            return match.leftTeamId === team.id || match.rightTeamId === team.id
        })
    })

    return {
        refresh: () => {
            refreshSport()
            refreshImages()
            refreshLocations()
            refreshTeams()
            refreshGames()
            refreshMatches()
        },
        isFetching: isFetchingSport || isFetchingImages || isFetchingLocations || isFetchingTeams || isFetchingGames || isFetchingMatches || isFetchingInformation,
        locations: locations,
        image: images.find((image: Image) => sport?.iconId === image.id),
        sport: sport,
        games: filteredGames,
        teams: filteredTeams,
        matches: filteredMatches,
        informationList: allInformation
    } as SportDataType
}