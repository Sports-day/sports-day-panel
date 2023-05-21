import {User} from "../../../src/models/UserModel";
import {useFetchTeams} from "../../../src/features/teams/hook";
import {UserTeamContent} from "./UserTeamContent";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export function UserTeams(props: {user: User}) {
    const {teams} = useFetchTeams()

    const userTeams = teams.filter(team => {
        return props.user.teamIds.includes(team.id)
    })

    const userTeamComponents = userTeams.map(team => {
        return (
            <UserTeamContent team={team} key={team.id}/>
        )
    })

    return (
        <>
            <h2>所属しているチーム一覧</h2>

            <TableContainer>
                <Table
                    sx={{
                        minWidth: 650,
                    }}
                    aria-label={"user teams table"}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                名前
                            </TableCell>
                            <TableCell>
                                説明(任意)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userTeamComponents}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}