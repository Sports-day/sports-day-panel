import {useFetchMyUser} from "../../users/hook";
import {useFetchTeams} from "../../teams/hook";
import {useFetchGames} from "../../games/hook";
import {useFetchSports} from "../../sports/hook";
import {Class} from "../../../models/ClassModel";
import {Team} from "../../../models/TeamModel";
import {Sport} from "../../../models/SportModel";
import {Game} from "../../../models/GameModel";
import {useState} from "react";
import {useFetchClasses} from "../../classes/hooks";

export type TeamGameSet = {
    team: Team,
    sport: Sport,
    game: Game,
}

export type TeamSetsInMyClassResponse = {
    isFetching: boolean
    isSuccessful: boolean
    myClass: Class | null
    teamGameSets: TeamGameSet[]
}

export function useFetchTeamSetsInMyClass(): TeamSetsInMyClassResponse {
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {games, isFetching: isFetchingGames} = useFetchGames()
    const {sports, isFetching: isFetchingSports} = useFetchSports()
    const {classes, isFetching: isFetchingClasses} = useFetchClasses()
    const {user, isFetching: isFetchingMyUser} = useFetchMyUser()

    //  state
    const [isSuccessful, setIsSuccessful] = useState<boolean>(true)
    const [myClass, setMyClass] = useState<Class | null>(null)
    const [teamGameSets, setTeamGameSets] = useState<TeamGameSet[]>([])

    const isFetching = isFetchingTeams || isFetchingGames || isFetchingSports || isFetchingClasses || isFetchingMyUser

    if (!isFetching) {
        fetchBlock: {
            if (!user) break fetchBlock
            const findMyClass = classes.find((c) => c.id === user?.classId)
            if (!findMyClass) break fetchBlock
            setMyClass(findMyClass)

            //  find teams belong to same class
            const findTeams = teams.filter((t) => t.classId === findMyClass.id)

            //  find games belong to each team
            const findTeamGameSets = findTeams.map((t) => {
                return t.enteredGameIds.map((gId) => {
                    const game = games.find((g) => g.id === gId)
                    const sport = sports.find((s) => s.id === game?.sportId)

                    return {
                        team: t,
                        sport: sport,
                        game: game,
                    }
                }) as TeamGameSet[]
            })

            setTeamGameSets(findTeamGameSets.flat())
            setIsSuccessful(true)
        }
    }

    return {
        isFetching,
        isSuccessful,
        myClass,
        teamGameSets,
    }
}