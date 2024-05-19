import {Sport} from "@/src/models/SportModel";
import {Team} from "@/src/models/TeamModel";
import {Match} from "@/src/models/MatchModel";
import {Game, gameFactory} from "@/src/models/GameModel";
import {Image} from "@/src/models/ImageModel";
import {Location} from "@/src/models/LocationModel";
import {useState} from "react";
import {useFetchImages} from "@/src/features/images/hook";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import { useFetchSports } from "@/src/features/sports/hook";
import {useFetchGames} from "@/src/features/games/hook";
import {useFetchMatches} from "@/src/features/matches/hook";
import {useFetchUsers} from "@/src/features/users/hook";
import {User} from "@/src/models/UserModel";
import {useFetchUserinfo} from "@/src/features/userinfo/hook";

export type DashboardDataType = {
    isFetching: boolean
    //  for sports list
    images: Image[]
    locations: Location[]
    teams: Team[]
    users: User[]
    sports: Sport[]
    games: Game[]
    matches: Match[]
    //  for individual section
    mySport: Sport | undefined
    myGame: Game | undefined
    myTeam: Team | undefined
    myTeamUsers: User[]
    myTeamMatches: Match[]
    myTeamRank: number
    myJudgeMatches: Match[]
}

export const useFetchDashboard = () => {
    //  is fetching
    const [isFetching, setIsFetching] = useState<boolean>(true)
    //  hook
    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {sports, isFetching: isFetchingSports} = useFetchSports(true)
    const {games, isFetching: isFetchingGames} = useFetchGames(true)
    const {matches, isFetching: isFetchingMatches} = useFetchMatches()
    const {users, isFetching: isFetchingUsers} = useFetchUsers()
    const {user, isFetching: isFetchingUserinfo} = useFetchUserinfo()
    //  individual state
    const [mySportState, setMySport] = useState<Sport | undefined>(undefined)
    const [myGameState, setMyGame] = useState<Game | undefined>(undefined)
    const [myTeamState, setMyTeam] = useState<Team | undefined>(undefined)
    const [myTeamMatchesState, setMyTeamMatches] = useState<Match[]>([])
    const [myTeamUsersState, setMyTeamUsers] = useState<User[]>([])
    const [myTeamRankState, setMyTeamRank] = useState<number>(0)
    const [myJudgeMatchesState, setMyJudgeMatches] = useState<Match[]>([])

    if(!isFetchingImages && !isFetchingLocations && !isFetchingTeams && !isFetchingSports && !isFetchingGames && !isFetchingMatches && !isFetchingUsers && !isFetchingUserinfo && isFetching) {
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
            if (!user) break fetchBlock

            //  my teams
            const myTeams = teams.filter(team => team.userIds.includes(user.id))
            if (myTeams.length === 0) break fetchBlock

            //  my games
            const myGames = games.filter(game => myTeams.some(team => team.enteredGameIds.includes(game.id)))
            if (myGames.length === 0) break fetchBlock

            //  my game (sort by weight)
            myGames.sort((a, b) => b.weight - a.weight)
            const myGame = myGames[0]
            //  set state
            setMyGame(myGame)

            //  my team
            const myTeam = myTeams.find(team => team.enteredGameIds.includes(myGame.id))
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
            //  set state
            setMyTeamMatches(myTeamMatches)

            //  fetch rank
            if (myGame.type === "league") {
                gameFactory().getLeagueResult(myGame.id, true)
                    .then(result => {
                        if (!result) return
                        const myTeamResult = result.teams.find(teamResult => teamResult.teamId === myTeam.id)
                        if (!myTeamResult) return
                        //  set state
                        setMyTeamRank(myTeamResult.rank)
                    })
                    .catch(() => {
                        console.log("failed to fetch league result")
                        setMyTeamRank(-1)
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
                        setMyTeamRank(-1)
                    })
            }

            //  my judge matches
            const myJudgeMatches = matches.filter(match => match.judgeTeamId === myTeam.id)
            //  set state
            setMyJudgeMatches(myJudgeMatches)
        }

        setIsFetching(false)
    }


    return {
        isFetching: isFetching,
        images: images,
        locations: locations,
        teams: teams,
        users: users,
        sports: sports,
        games: games,
        matches: matches,
        //  for individual section
        mySport: mySportState,
        myGame: myGameState,
        myTeam: myTeamState,
        myTeamUsers: myTeamUsersState,
        myTeamMatches: myTeamMatchesState,
        myTeamRank: myTeamRankState,
        myJudgeMatches: myJudgeMatchesState
    } as DashboardDataType

}