import {NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack, SvgIcon,
    Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import {GameProgress} from "../components/game/game-progress";
import {GameBest} from "../components/game/game-best";
import {Navigation} from "../components/layouts/navigation";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle} from "react-icons/hi2";
import {GamePointBar} from "../components/game/game-pointbar"
import * as React from "react";

const Home: NextPage = () => {
    const sport = "競技名";
    const best = ["チーム1","チーム2","チーム3"];
    const progress = 1;

    return(
        <>
            <Head>
                <title>SPORTSDAY : Home</title>
            </Head>
            <Navigation/>
            <Box
                component={"main"}
                sx={{
                    flexGrow: 1,
                    py: 5,
                }}
            >
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        paddingTop: "0px",
                }}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={3}
                        sx={{
                            position: "relative",
                            left: "-8px",
                            top: "-8px",
                            width: "100vw",
                            height:"fit-content",
                            backgroundColor: "#23398a",
                        }}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={3}
                            sx={{
                                py:8
                            }}
                        >
                            <Avatar
                                alt={sport}
                                sx={{height: "3.5em", width: "3.5em"}}
                                src={"/public/images/basketball.jpg"}
                            >

                            </Avatar>
                            <Typography sx={{color: "#FFF", fontSize: "30px", fontWeight: "bold"}}>
                                {sport}
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
                <Container
                    maxWidth={"xl"}
                    disableGutters
                    sx={{px:0.5, pb:3}}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Button href={"/"}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"flex-start"}
                                spacing={1}
                                sx={{padding:1, py:3}}
                            >
                                <SvgIcon>
                                    <HiArrowLeftCircle color="#23398a"/>
                                </SvgIcon>
                                <Typography>
                                    戻る
                                </Typography>
                            </Stack>
                        </Button>
                        <Button>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"flex-start"}
                                spacing={1}
                                sx={{padding:1, py:3}}
                            >
                                <Typography>
                                    ルールを見る
                                </Typography>
                                <SvgIcon>
                                    <HiEllipsisHorizontalCircle color="#23398a"/>
                                </SvgIcon>
                            </Stack>
                        </Button>
                    </Stack>
                    <Stack
                        direction={"column"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Grid container spacing={2}>

                            <Grid xs={12} sm={6} lg={6}>
                                <GameBest
                                    value1={best[0]}
                                    value2={best[1]}
                                    value3={best[2]}
                                />
                            </Grid>

                            <Grid xs={12} sm={6} lg={6}>
                                <GameProgress
                                    chartSeries={[progress, 100-progress]}
                                    labels={["完了した競技", "未完了の競技"]}
                                />
                            </Grid>

                        </Grid>
                    </Stack>
                </Container>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        paddingTop: "0px",
                        paddingBottom: "20px"
                    }}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={3}
                        sx={{
                            position: "relative",
                            left: "-8px",
                            top: "-8px",
                            width: "100vw",
                            height:"fit-content",
                            backgroundColor: "#23398a",
                        }}
                    >
                        <Stack
                            direction={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                            spacing={3}
                            sx={{
                                width: "100vw",
                            }}
                        >
                            <GamePointBar
                                chartSeries={[
                                    {
                                        data: [18, 16, 5, 8, 3, 14, 14]
                                    },
                                    {
                                        data: [18, 16, 5, 8, 3, 14, 14]
                                    },
                                ]}
                                sx={{ height: '100%', width: "100%"}}
                            />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Home