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
    myClass: Class | undefined
    teamGameSets: TeamGameSet[]
}

export const useFetchTeamSetsInMyClass = () => {
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {games, isFetching: isFetchingGames} = useFetchGames()
    const {sports, isFetching: isFetchingSports} = useFetchSports()
    const {classes, isFetching: isFetchingClasses} = useFetchClasses()
    const {user, isFetching: isFetchingMyUser} = useFetchMyUser()

    //  state
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
    const [myClass, setMyClass] = useState<Class | undefined>(undefined)
    const [teamGameSets, setTeamGameSets] = useState<TeamGameSet[]>([])

    if (!isFetchingTeams && !isFetchingGames && !isFetchingSports && !isFetchingClasses && !isFetchingMyUser && isFetching) {
        fetchBlock: {
            if (!user) break fetchBlock
            const findMyClass = classes.find((c) => c.id === user?.classId)
            if (!findMyClass) break fetchBlock
            setMyClass(findMyClass)

            //  find teams belong to same class
            const findTeams = teams.filter((t) => t.classId === findMyClass.id)

            //  find games belong to each team
            const findTeamGameSets: TeamGameSet[] = []
            for (const team of findTeams) {
                const sets = team.enteredGameIds.map((gId) => {
                    const game = games.find((g) => g.id === gId)
                    const sport = sports.find((s) => s.id === game?.sportId)

                    return {
                        team: team,
                        sport: sport,
                        game: game,
                    }
                }) as TeamGameSet[]

                findTeamGameSets.push(...sets)
            }

            setTeamGameSets(findTeamGameSets)
            setIsSuccessful(true)
        }

        setIsFetching(false)
    }

    return {
        isFetching,
        isSuccessful,
        myClass,
        teamGameSets,
    } as TeamSetsInMyClassResponse
}