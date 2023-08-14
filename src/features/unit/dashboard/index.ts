import {Sport} from "../../../models/SportModel";
import {Team} from "../../../models/TeamModel";
import {Match} from "../../../models/MatchModel";
import {Game, gameFactory} from "../../../models/GameModel";
import {Image} from "../../../models/ImageModel";
import {Location} from "../../../models/LocationModel";
import {useContext, useState} from "react";
import {useFetchImages} from "../../images/hook";
import {useFetchLocations} from "../../locations/hook";
import {useFetchTeams} from "../../teams/hook";
import { useFetchSports } from "../../sports/hook";
import {useFetchGames} from "../../games/hook";
import {useFetchMatches} from "../../matches/hook";
import {useFetchUsers} from "../../users/hook";
import {User} from "../../../models/UserModel";
import {MicrosoftAccountContext} from "../../../../components/context";
import {Information} from "../../../models/InformationModel";
import {useFetchAllInformation} from "../../information/hook";

export type DashboardDataType = {
    isFetching: boolean
    //  for sports list
    images: Image[]
    locations: Location[]
    teams: Team[]
    sports: Sport[]
    games: Game[]
    matches: Match[]
    informationList: Information[]
    //  for individual section
    mySport: Sport | undefined
    myGame: Game | undefined
    myTeam: Team | undefined
    myTeamUsers: User[]
    myTeamMatches: Match[]
    myTeamRank: number
}

export const useFetchDashboard = () => {
    //  is fetching
    const [isFetching, setIsFetching] = useState<boolean>(true)
    //  hook
    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {sports, isFetching: isFetchingSports} = useFetchSports()
    const {games, isFetching: isFetchingGames} = useFetchGames()
    const {matches, isFetching: isFetchingMatches} = useFetchMatches()
    const {users, isFetching: isFetchingUsers} = useFetchUsers()
    const {allInformation, isFetching: isFetchingInformation} = useFetchAllInformation()
    //  context
    const {data: microsoftAccount} = useContext(MicrosoftAccountContext)
    //  individual state
    const [mySportState, setMySport] = useState<Sport | undefined>(undefined)
    const [myGameState, setMyGame] = useState<Game | undefined>(undefined)
    const [myTeamState, setMyTeam] = useState<Team | undefined>(undefined)
    const [myTeamMatchesState, setMyTeamMatches] = useState<Match[]>([])
    const [myTeamUsersState, setMyTeamUsers] = useState<User[]>([])
    const [myTeamRankState, setMyTeamRank] = useState<number>(0)

    if(!isFetchingImages && !isFetchingLocations && !isFetchingTeams && !isFetchingSports && !isFetchingGames && !isFetchingMatches && !isFetchingUsers && !isFetchingInformation && isFetching) {
        //  fetch data for individual section
        fetchBlock: {
            /*
            my userを取得
            my userが所属するteamsを取得
            teamsのgames取得
            gameの重みでmyGame決定
            myGame決定でmyTeam決定 OK
            myGame決定でMySport決定 OK
            myGame決定でmatches決定 OK
            myTeam決定でmyTeamUsers決定 OK
            myGameの順位を決定
             */
            //  my user
            const myUser = users.find(user => user.id === microsoftAccount?.userId)
            console.log("myUser", myUser)
            if (!myUser) break fetchBlock

            //  my teams
            const myTeams = teams.filter(team => team.userIds.includes(myUser.id))
            console.log("myTeams", myTeams)
            if (myTeams.length === 0) break fetchBlock

            //  my games
            const myGames = games.filter(game => myTeams.some(team => team.enteredGameIds.includes(game.id)))
            console.log("myGames", myGames)
            if (myGames.length === 0) break fetchBlock

            //  my game (sort by weight)
            myGames.sort((a, b) => b.weight - a.weight)
            const myGame = myGames[0]
            //  set state
            setMyGame(myGame)

            //  my team
            const myTeam = myTeams.find(team => team.enteredGameIds.includes(myGame.id))
            console.log("myTeam", myTeam)
            if (!myTeam) break fetchBlock
            //  set state
            setMyTeam(myTeam)

            //  my team users
            const myTeamUsers = users.filter(user => myTeam.userIds.includes(user.id))
            //  set state
            setMyTeamUsers(myTeamUsers)

            //  my sport
            const mySport = sports.find(sport => sport.id === myGame.sportId)
            if (!mySport) break fetchBlock
            //  set state
            setMySport(mySport)

            //  my game matches
            const myGameMatches = matches.filter(match => match.gameId === myGame.id)
            const myTeamMatches = myGameMatches.filter(match => {
                return match.leftTeamId === myTeam.id || match.rightTeamId === myTeam.id
            })
            console.log("myTeamMatches", myTeamMatches)
            //  set state
            setMyTeamMatches(myTeamMatches)

            //  fetch rank
            if (myGame.type === "league") {
                gameFactory().getLeagueResult(myGame.id)
                    .then(result => {
                        if (!result) return
                        const myTeamResult = result.teams.find(teamResult => teamResult.teamId === myTeam.id)
                        if (!myTeamResult) return
                        //  set state
                        setMyTeamRank(myTeamResult.rank)
                    })
                    .catch(() => {
                        console.log("failed to fetch league result")
                    })
            } else {
                gameFactory().getTournamentResult(myGame.id)
                    .then(result => {
                        if (!result) return
                        const myTeamResult = result.teams.find(teamResult => teamResult.teamId === myTeam.id)
                        if (!myTeamResult) return
                        //  set state
                        setMyTeamRank(myTeamResult.rank)
                    })
                    .catch(() => {
                        console.log("failed to fetch tournament result")
                    })
            }
        }

        setIsFetching(false)
    }


    return {
        isFetching: isFetching,
        images: images,
        locations: locations,
        teams: teams,
        sports: sports,
        games: games,
        matches: matches,
        informationList: allInformation,
        //  for individual section
        mySport: mySportState,
        myGame: myGameState,
        myTeam: myTeamState,
        myTeamUsers: myTeamUsersState,
        myTeamMatches: myTeamMatchesState,
        myTeamRank: myTeamRankState
    } as DashboardDataType

}