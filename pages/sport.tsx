import {NextPage} from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    SvgIcon,
    Tab, Tabs,
    Typography,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import {GameProgress} from "../components/game/game-progress";
import {GameBest} from "../components/game/game-best";
import {Navigation} from "../components/layouts/navigation";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle} from "react-icons/hi2";
import {GamePointBar} from "../components/game/game-pointbar"
import * as React from "react";
import {useFetchSportGames, useFetchSportProgress} from "../src/features/sports/hook";
import {useFetchMyTeams} from "../src/features/teams/hook";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function tabProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Sport: NextPage = () => {
    const sport = "競技名";
    const best = ["チーム1","チーム2","チーム3"];
    const progress = 12
    const {teams} = useFetchMyTeams();

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {setValue(newValue);};

    return(
        <>
            <Head>
                <title>SPORTSDAY : {sport}</title>
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
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Item One" {...tabProps(0)} />
                                    <Tab label="Item Two" {...tabProps(1)} />
                                    <Tab label="Item Three" {...tabProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <GamePointBar
                                    chartSeries={[
                                        {
                                            data: [18, 16, 5, 8, 3, 14, 14]
                                        },
                                        {
                                            data: [11, 12, 15, 18, 13, 4, 2]
                                        },
                                    ]}
                                    sx={{ height: '100%', width: "100%"}}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Sport