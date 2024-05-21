import {
    Avatar,
    Box,
    Button,
    Card, Chip,
    Container, LinearProgress, linearProgressClasses,
    Stack, styled,
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
import {ThemeProvider, useTheme} from "@mui/material/styles";
import {useFetchUsers} from "@/src/features/users/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchLocations} from "@/src/features/locations/hook";

export type UserDetailProps = {
    match: Match;
}

export const UserDetail = (props: UserDetailProps) => {
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
    const PointBar = styled(LinearProgress)(({}) => ({
        height: 4.5,
        borderRadius: 2,
        [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: `${theme.palette.text.disabled}33`,},
        [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: theme.palette.text.primary,},
    }));
    const maxLeftScore = props.match.leftScore
    const maxRightScore = props.match.rightScore
    const maxScore = maxLeftScore > maxRightScore ? maxLeftScore : maxRightScore
    const barOffset = (maxScore == 0) ? 1 : (95 / maxScore)

    let matchStatus;
    switch (props.match.status) {
        case "standby":
            matchStatus = "開始前";
            break;
        case "in_progress":
            matchStatus = "進行中";
            break;
        case "finished":
            matchStatus = "完了";
            break;
        case "cancelled":
            matchStatus = "中止";
            break;
        default:
            matchStatus = "状態不明";
    }

    let statusColor;
    switch (props.match.status) {
        case "standby":
            statusColor = `${theme.palette.text.primary}1A`;
            break;
        case "in_progress":
            statusColor = `${theme.palette.warning.main}33`;
            break;
        case "finished":
            statusColor = `${theme.palette.success.main}33`;
            break;
        case "cancelled":
            statusColor = `${theme.palette.error.main}33`;
            break;
        default:
            statusColor = `${theme.palette.secondary.main}33`;
    }



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
                        <Box
                            sx={{
                                py: 0,
                                px: 2,
                                mx:1,
                                display:"flex",
                                borderRadius: "10px",
                                backgroundColor: statusColor,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography color={theme.palette.text.primary} fontSize={"14px"}
                                        fontWeight={"600"}>
                                状態：{matchStatus}
                            </Typography>
                        </Box>
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
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"start"}
                                        alignItems={"center"}
                                        spacing={2}
                                    >
                                        <Typography sx={{color: theme.palette.text.primary, fontSize: "20px", fontWeight: "bold"}}>
                                            {props.match.leftScore}
                                        </Typography>
                                        <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                            {leftTeamModel?.name}
                                        </Typography>
                                    </Stack>
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
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"end"}
                                        alignItems={"center"}
                                        spacing={2}
                                    >
                                        <Typography fontSize={"20px"} color={theme.palette.text.primary}>
                                            {rightTeamModel?.name}
                                        </Typography>
                                        <Typography sx={{color: theme.palette.text.primary, fontSize: "20px", fontWeight: "bold"}}>
                                            {props.match.rightScore}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Button
                                    color={"secondary"}
                                    sx={{
                                        width: "100%",
                                        border: `1px solid ${theme.palette.secondary.dark}66`,
                                    }}
                                >
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"space-between"}
                                        alignItems={"space-between"}
                                        maxWidth={'xl'}
                                        mr={0.5}
                                        sx={{ flexGrow:1 }}
                                        spacing={0}
                                    >
                                        <Box>
                                            <ThemeProvider theme={{direction:"rtl"}}>
                                                <PointBar
                                                    variant={"determinate"}
                                                    value={props.match.leftScore * barOffset}
                                                />
                                            </ThemeProvider>
                                        </Box>
                                    </Stack>
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"space-between"}
                                        alignItems={"space-between"}
                                        maxWidth={'xl'}
                                        ml={0.5}
                                        sx={{ flexGrow:1 }}
                                        spacing={0}
                                    >
                                        <Box>
                                            <PointBar
                                                variant={"determinate"}
                                                value={props.match.rightScore * barOffset}
                                            />
                                        </Box>
                                    </Stack>
                                </Button>
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

