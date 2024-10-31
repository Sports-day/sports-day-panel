import {useTheme, Typography, Stack, Box, Button, SwipeableDrawer, Container, Card, Avatar} from "@mui/material";
import * as React from "react";
import {Fragment} from "react";
import {useState} from "react";
import {HiUser} from "react-icons/hi2";
import {useFetchUsers} from "@/src/features/users/hook";

export type LeagueRankListCardProps = {
    teamName: string
    teamId: number
    rank: number
    winRate: number
}

export const LeagueRankListCard = (props: LeagueRankListCardProps) => {
    const theme = useTheme();
    const {users, isFetching: isFetchingUsers} = useFetchUsers()
    //teamDrawer
    const [teamDrawerOpen, setTeamDrawerOpen] = useState(false);
    const toggleTeamDrawer = (newOpen: boolean) => () => {
        setTeamDrawerOpen(newOpen);
    };

    return (
        <>
            <Box sx={{minWidth:"140px"}}>
                <Button
                    disableElevation
                    color={"secondary"}
                    variant={"contained"}
                    onClick={toggleTeamDrawer(true)}
                    sx={{
                        background:`linear-gradient(${theme.palette.secondary.main}, ${theme.palette.secondary.dark}80)`,
                        border: `1px solid ${theme.palette.secondary.dark}66`,
                        boxShadow: `0px 0px 5px ${theme.palette.primary.dark}33`,
                    }}
                >
                    <Stack
                        direction={"column"}
                        spacing={0.5}
                        width={"100%"}
                        alignItems={"start"}
                        mt={1}
                        mb={2}
                    >
                        <Typography
                            fontSize={"30px"}
                            color={theme.palette.text.secondary}
                        >
                            #{props.rank}
                        </Typography>
                        <Typography
                            fontSize={"20px"}
                            color={theme.palette.text.primary}
                            mt={1}
                        >
                            {props.teamName}
                        </Typography>
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                        >
                            <Box
                                sx={{
                                    px: 0.8,
                                    height:"16px",
                                    borderRadius: "5px",
                                    backgroundColor: theme.palette.text.secondary,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>
                                    勝ち点率
                                </Typography>
                            </Box>
                            <Typography fontSize={"14px"} color={theme.palette.text.primary}>
                                {props.winRate.toFixed(3)}
                            </Typography>
                        </Stack>
                        {/*<Stack*/}
                        {/*    direction={"row"}*/}
                        {/*    spacing={1}*/}
                        {/*    alignItems={"center"}*/}
                        {/*>*/}
                        {/*    <Box*/}
                        {/*        sx={{*/}
                        {/*            px: 0.8,*/}
                        {/*            height:"16px",*/}
                        {/*            borderRadius: "5px",*/}
                        {/*            backgroundColor: theme.palette.text.secondary,*/}
                        {/*            justifyContent: "center",*/}
                        {/*            alignItems: "center"*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <Typography color={theme.palette.background.default} fontSize={"10px"} fontWeight={"600"}>*/}
                        {/*            総得点率*/}
                        {/*        </Typography>*/}
                        {/*    </Box>*/}
                        {/*    <Typography fontSize={"14px"} color={theme.palette.text.primary}>*/}
                        {/*        {props.totalRate.toFixed(3)}*/}
                        {/*    </Typography>*/}
                        {/*</Stack>*/}
                    </Stack>

                </Button>
            </Box>

            {/*teamDrawer*/}
            <SwipeableDrawer
                anchor="bottom"
                open={teamDrawerOpen}
                onClose={toggleTeamDrawer(false)}
                onOpen={toggleTeamDrawer(true)}
                swipeAreaWidth={5}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{elevation: 0, style: {backgroundColor: "transparent"}}}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: 'auto',
                        overflow: 'scrollable',
                        background: `${theme.palette.secondary.main}FC`,
                        backdropFilter: 'blur(30px)',
                        borderRadius: "15px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: '#E8EBF8',
                        pb: 5,
                        pt: 1.5
                    }}
                    role="Navigation"
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
                                    {props.teamName}のメンバー
                                </Typography>
                            </Stack>

                            {users
                                .filter(user => user.teamIds.includes(Number(props.teamId)))
                                .map(user => {
                                    // const image = `${process.env.NEXT_PUBLIC_API_URL}/images/${user?.pictureId}/file`
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
                                                    >
                                                        <HiUser/>
                                                    </Avatar>
                                                    <Typography color={theme.palette.text.primary}>
                                                        {user.name}
                                                    </Typography>
                                                </Stack>
                                            </Card>
                                        </Fragment>
                                    );
                                })
                            }
                        </Stack>
                    </Container>
                </Box>
            </SwipeableDrawer>
        </>
    )

}