import {
    Avatar,
    Box,
    Card, Chip,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import * as React from "react";
import {Fragment} from "react";
import {Match} from "@/src/models/MatchModel";
import {
    HiClock,
    HiFlag,
    HiMapPin,
    HiUser,
} from "react-icons/hi2";
import {useTheme} from "@mui/material/styles";
import {useFetchUsers} from "@/src/features/users/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchLocations} from "@/src/features/locations/hook";

export type MatchDetailProps = {
    match: Match;
}

export const MatchDetail = (props: MatchDetailProps) => {
    const theme = useTheme();
    //  context
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {users, isFetching: isFetchingUsers} = useFetchUsers()

    //  team is null
    if (!props.match.leftTeamId || !props.match.rightTeamId) return null;
    //  get left team
    const leftTeamModel = teams.find(team => team.id === props.match.leftTeamId);
    // get right team
    const rightTeamModel = teams.find(team => team.id === props.match.rightTeamId);
    // Get judge team
    const judgeTeam = teams.find(team => team.id === props.match.judgeTeamId);
    //  get time and location
    const formattedTime = new Date(props.match.startAt).toLocaleTimeString("ja-JP", {
        hour: '2-digit',
        minute: '2-digit'
    });
    const locationModel = locations.find(location => location.id === props.match.locationId)

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',
                    background: `${theme.palette.secondary.main}FC`,
                    backdropFilter: 'blur(30px)',
                    borderRadius: "15px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    color: '#E8EBF8',
                    pb: 5,
                    pt: 1.5
                }}
            >
                <Container maxWidth={"xl"}>
                    <Stack spacing={1}>
                        <Stack direction={"column"} spacing={2} pb={2} justifyContent={"center"}
                               alignItems={"center"}>
                            <Box sx={{
                                width: 50,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: `${theme.palette.text.primary}4D`
                            }}></Box>
                            <Typography
                                color={theme.palette.text.primary}
                                textAlign={"center"}
                            >
                                試合の詳細
                            </Typography>
                        </Stack>
                        <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`, py: 1, px: 1}}>
                            <Stack
                                direction={"row"}
                                spacing={1}
                                sx={{width: "100%", height: "100%"}}
                                alignItems={"flex-start"}
                            >
                                <Stack
                                    sx={{width: "100%"}}
                                    direction={"row"}
                                    spacing={1}
                                    justifyContent={"space-around"}
                                    alignItems={"center"}
                                >
                                    <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                        {leftTeamModel?.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            pt: 0,
                                            px: 0.8,
                                            borderRadius: "5px",
                                            backgroundColor: theme.palette.text.secondary,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography color={theme.palette.background.default} fontSize={"10px"}
                                                    fontWeight={"600"}>
                                            VS
                                        </Typography>
                                    </Box>
                                    <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                        {rightTeamModel?.name}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Box sx={{overflow: "auto", pt: 1}}>
                                <Stack sx={{width: "100%"}} direction={"row"} spacing={0.2} pl={2}>
                                    <Chip
                                        label={`審判：${judgeTeam?.name}`}
                                        avatar={<Avatar><HiFlag/></Avatar>}
                                        color={"secondary"}
                                    />
                                    <Chip
                                        label={`開始：${formattedTime}`}
                                        avatar={<Avatar><HiClock/></Avatar>}
                                        color={"secondary"}
                                    />
                                    <Chip
                                        label={`場所：${locationModel?.name}`}
                                        avatar={<Avatar><HiMapPin/></Avatar>}
                                        color={"secondary"}
                                    />
                                </Stack>
                            </Box>
                        </Card>
                        <Typography
                            color={theme.palette.text.primary}
                            textAlign={"center"}
                            pt={2}
                        >
                            {leftTeamModel?.name}のメンバー
                        </Typography>
                        {users
                            .filter(user => user.teamIds.includes(Number(leftTeamModel?.id)))
                            .map(user => {
                                const image = `${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`
                                return (
                                    <Fragment key={user.id}>
                                        <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`,}}>
                                            <Stack direction={"row"} px={2} py={1} spacing={3} ml={0.4}
                                                   alignItems={"center"}>
                                                <Avatar
                                                    alt={"unknown"}
                                                    sx={{
                                                        height: "1.5em",
                                                        width: "1.5em",
                                                        backgroundColor: theme.palette.text.secondary,
                                                    }}
                                                    src={image}
                                                >
                                                    {user?.pictureId === null && <HiUser/>}
                                                </Avatar>
                                                <Typography color={theme.palette.text.primary}>
                                                    {user.name}
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </Fragment>
                                );
                            })}
                        <Typography
                            color={theme.palette.text.primary}
                            textAlign={"center"}
                            pt={2}
                        >
                            {rightTeamModel?.name}のメンバー
                        </Typography>
                        {users
                            .filter(user => user.teamIds.includes(Number(rightTeamModel?.id)))
                            .map(user => {
                                const image = `${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`
                                return (
                                    <Fragment key={user.id}>
                                        <Card sx={{backgroundColor: `${theme.palette.secondary.dark}80`,}}>
                                            <Stack direction={"row"} px={2} py={1} spacing={3} ml={0.4}
                                                   alignItems={"center"}>
                                                <Avatar
                                                    alt={"unknown"}
                                                    sx={{
                                                        height: "1.5em",
                                                        width: "1.5em",
                                                        backgroundColor: theme.palette.text.secondary,
                                                    }}
                                                    src={image}
                                                >
                                                    {user?.pictureId === null && <HiUser/>}
                                                </Avatar>
                                                <Typography color={theme.palette.text.primary}>
                                                    {user.name}
                                                </Typography>
                                            </Stack>
                                        </Card>
                                    </Fragment>
                                );
                            })}
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
