import {
    Box,
    Button,
    Stack,
    styled,
    LinearProgress,
    SwipeableDrawer,
    Typography, SvgIcon,
    useTheme
} from "@mui/material";
import {linearProgressClasses} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {HiClock, HiFlag} from "react-icons/hi2";
import {useContext} from "react";
import {TeamsContext} from "../../context";
import {MatchDetail} from "@/components/game/GameList/matchDetail";
import {Match} from "@/src/models/MatchModel";

export type GamePointBarProps = {
    leftScore: number,
    rightScore: number,
    leftTeamId: number | null,
    rightTeamId: number | null,
    umpireTeam: string,
    time: string,
    barOffset: number,
    match: Match,
    myTeamId?: number,
    otherUser?: boolean,
    dashboard?: boolean
}

export const GamePointBar = (props: GamePointBarProps) => {
    const theme = useTheme();
    const {data: teams} = useContext(TeamsContext);

    const {leftScore, rightScore, leftTeamId, rightTeamId, umpireTeam, time, barOffset} = props;
    const leftTeam = teams.find(team => team.id === leftTeamId);
    const rightTeam = teams.find(team => team.id === rightTeamId);
    const isMyTeamPlay = props.myTeamId === leftTeamId || props.myTeamId === rightTeamId;
    const isMyTeamUmpire = props.myTeamId === Number(umpireTeam);
    const judgeTeam = teams.find(team => team.id === Number(umpireTeam));
    const judgeTeamName = judgeTeam?.name
    const formattedTime = new Date(time).toLocaleTimeString("ja-JP", {hour: '2-digit', minute:'2-digit'});
    const backgroundColor = isMyTeamPlay ? `${theme.palette.warning.main}66` : isMyTeamUmpire ? `${theme.palette.success.main}66` : `${theme.palette.text.disabled}33`;
    const PointBar = styled(LinearProgress)(({}) => ({
        height: 4.5,
        borderRadius: 2,
        [`&.${linearProgressClasses.colorPrimary}`]: {backgroundColor: `${theme.palette.text.disabled}33`,},
        [`& .${linearProgressClasses.bar}`]: {borderRadius: 2, backgroundColor: theme.palette.text.primary,},
    }));
    const [open, toggleDrawer] = React.useState(false);
    const userDisplay = props.otherUser ? "この人" : "あなた";


    return(
        <>
            {isMyTeamPlay &&
                <Stack sx={{width:"100%", justifyContent: "center", alignItems: "start",}}>
                    <Box
                        sx={{
                            py: 0.25,
                            px:2,
                            borderRadius: "9px",
                            backgroundColor: backgroundColor,
                            position:"relative",
                            top:"4px",
                        }}
                    >
                        <Typography color={theme.palette.text.primary} fontSize={"10px"} fontWeight={"600"}>
                            {userDisplay}のチームが参加
                        </Typography>
                    </Box>
                </Stack>
            }
            {isMyTeamUmpire &&
                <Stack sx={{width:"100%", justifyContent: "center", alignItems: "start",}}>
                    <Box
                        sx={{
                            py: 0.25,
                            px:2,
                            borderRadius: "9px",
                            backgroundColor: backgroundColor,
                            position:"relative",
                            top:"4px",
                        }}
                    >
                        <Typography color={theme.palette.text.primary} fontSize={"10px"} fontWeight={"600"}>
                            {userDisplay}のチームが審判
                        </Typography>
                    </Box>
                </Stack>
            }
            <Button
                variant={"contained"}
                color={"secondary"}
                sx={{
                    width: "100%",
                    border: `1px solid ${backgroundColor}`,
                    backgroundColor: `${theme.palette.text.disabled}33`,
                    pt:1.4,
                    pb:1.8
                }}
                onClick={() => toggleDrawer(true)}
            >
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"space-between"}
                        maxWidth={'xl'}
                        sx={{ flexGrow:1 }}
                        spacing={1}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"start"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography sx={{color: theme.palette.text.primary, fontSize: "20px", fontWeight: "bold"}}>
                                {leftScore}
                            </Typography>
                            <Typography sx={{color: theme.palette.text.primary, fontSize: "14px"}}>
                                {leftTeam?.name}
                            </Typography>
                        </Stack>
                        <Box>
                            <ThemeProvider theme={{direction:"rtl"}}>
                                <PointBar
                                    variant={"determinate"}
                                    value={leftScore * barOffset}
                                />
                            </ThemeProvider>
                        </Box>
                    </Stack>

                    <Stack direction={"column"} alignItems={"center"} mx={1.5} spacing={0.5} pt={0}>
                        <Stack direction={"row"}>
                            <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                <HiFlag color={`${theme.palette.text.primary}CC`}/>
                            </SvgIcon>
                            <Typography sx={{color: `${theme.palette.text.primary}CC`, fontSize: "14px"}}>
                                {!judgeTeamName && "ルール参照"}
                                {judgeTeamName && `${judgeTeamName}`}
                            </Typography>
                        </Stack>
                            <Stack direction={"row"}>
                                    <SvgIcon fontSize={"small"} sx={{position:"relative", top:"2px"}}>
                                        <HiClock color={`${theme.palette.text.primary}CC`}/>
                                    </SvgIcon>
                                    <Typography sx={{color: `${theme.palette.text.primary}CC`, fontSize: "14px"}}>
                                        {formattedTime}
                                    </Typography>
                            </Stack>
                    </Stack>

                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        alignItems={"space-between"}
                        maxWidth={'xl'}
                        sx={{ flexGrow:1 }}
                        spacing={1}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"end"}
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography sx={{color: `${theme.palette.text.primary}CC`, fontSize: "14px"}}>
                                {rightTeam?.name}
                            </Typography>
                            <Typography sx={{color: theme.palette.text.primary, fontSize: "20px", fontWeight: "bold"}}>
                                {rightScore}
                            </Typography>
                        </Stack>
                        <Box>
                            <PointBar
                                variant={"determinate"}
                                value={rightScore * barOffset}
                            />
                        </Box>
                    </Stack>
            </Button>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                swipeAreaWidth={5}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                <MatchDetail match={props.match}/>
            </SwipeableDrawer>
        </>
    )
}