'use client'
import {
    Box,
    Container,
    Stack, Typography,
    Unstable_Grid2 as Grid,
    TextField,
    useTheme, Tabs, Tab
} from "@mui/material";
import * as React from "react";
import {useFetchTeamSetsInMyClass} from "@/src/features/unit/discover";
import {Loading} from "@/components/layouts/loading";
import {motion} from "framer-motion";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchImages} from "@/src/features/images/hook";
import {DiscoverTeamContent} from "@/components/discover/DiscoverTeamContent";
import {OtherInfo} from "@/components/dashboard/Overview/OtherInfo";
import CircleContainer from "@/components/layouts/circleContainer";
import {useFetchUsers} from "@/src/features/users/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchGames} from "@/src/features/games/hook";
import {useFetchMatches} from "@/src/features/matches/hook";
import {DiscoverUser} from "@/components/discover/discoverUser";
import {MatchesContext, TeamsContext} from "@/components/context";
// import {Metadata} from "next";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Discover',
// }

export type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    spacing={1}
                >
                    {children}
                </Stack>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DiscoverPage() {
    const theme = useTheme()
    //  Unit Hook
    const {
        isFetching,
        isSuccessful,
        matchSets
    } = useFetchTeamSetsInMyClass()
    const {users, isFetching: isFetchingUsers} = useFetchUsers()
    const {teams, isFetching: isFetchingTeams} = useFetchTeams()
    const {games, isFetching: isFetchingGames} = useFetchGames()
    const {matches, isFetching: isFetchingMatches} = useFetchMatches()

    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()

    const [searchText, setSearchText] = React.useState("");
    const filteredUsers = searchText
        ? users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
        : [];

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            {(isFetching || isFetchingLocations || isFetchingImages) && (
                <motion.div
                    key={"loading"}
                    initial={{opacity: 0}}
                    animate={{opacity: 0.2}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, ease: [0, 0.5, 0, 1]}}
                >
                    <Loading/>
                </motion.div>
            )}
            {!(isFetching || isFetchingLocations || isFetchingImages) && (
                <>
                    <MatchesContext.Provider
                        value={{
                            data: matches,
                            refresh: () => {
                            }
                        }}
                    >
                        <TeamsContext.Provider
                            value={{
                                data: teams,
                                refresh: () => {
                                }
                            }}
                        >
                        <Box
                            component={"main"}
                            minHeight={"100vh"}
                            sx={{
                                flexGrow: 1,
                                overflow: "hidden",
                                pb: 9
                            }}
                        >
                            <CircleContainer>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    spacing={1}
                                    sx={{pt: 3}}
                                >
                                    <Typography fontSize={"20px"} fontWeight={"600"}>
                                        試合を探す
                                    </Typography>
                                </Stack>
                            </CircleContainer>

                            <Container
                                maxWidth={"xl"}
                                sx={{px: 2, pb: 3,mb:5, mt: "-100px"}}
                            >
                                {!isSuccessful && (
                                    <OtherInfo infoName={""}
                                               infoContent={"探す機能が一部使用できない可能性があります"}
                                               infoSubContent={"どの競技にも参加していません。参加予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                )}
                                <Box sx={{
                                    position: "relative",
                                    mb:2,
                                    mt:2,
                                }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant={"scrollable"}
                                        scrollButtons={false}
                                        aria-label="basic tabs example"
                                        TabIndicatorProps={{
                                            style: {
                                                zIndex: 0,
                                                backgroundColor: `${theme.palette.text.primary}CC`,
                                                borderRadius: '15px',
                                                height: '49px',
                                            }
                                        }}
                                    >
                                        <Tab sx={{
                                            zIndex: 1,
                                            mr: 1,
                                            color: `${theme.palette.text.primary}FF`,
                                            border: `1px solid ${theme.palette.text.primary}4D`,
                                            borderRadius: "15px"
                                        }} label={"学籍番号で検索"} {...a11yProps(1)} />
                                        <Tab sx={{
                                            zIndex: 1,
                                            mr: 1,
                                            color: `${theme.palette.text.primary}FF`,
                                            border: `1px solid ${theme.palette.text.primary}4D`,
                                            borderRadius: "15px"
                                        }} label={"同じクラス"} {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <motion.div
                                        key={"overview-content"}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        <Box
                                            px={0}
                                            py={0}
                                            mb={"8px"}
                                            sx={{
                                                width: "100%",
                                                borderRadius: "12px",
                                                backgroundColor: `${theme.palette.secondary.light}33`,
                                                border: `1px solid ${theme.palette.text.primary}1A`,
                                            }}>
                                            <TextField
                                                color={"info"}
                                                fullWidth
                                                value={searchText}
                                                onChange={event => setSearchText(event.target.value)}
                                                placeholder="学籍番号を入力"
                                            />
                                        </Box>

                                        {searchText &&
                                            <Box
                                                px={1}
                                                py={2}
                                                mb={"8px"}
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: "12px",
                                                    backgroundColor: `${theme.palette.secondary.dark}FF`,
                                                    border: `1px solid ${theme.palette.text.primary}1A`,
                                                }}>
                                                { isFetching &&
                                                    <>
                                                        <Loading/>
                                                    </>
                                                }
                                                {/* List the names of the filtered users */}
                                                {filteredUsers.map(user => (
                                                    <DiscoverUser
                                                        key={user.id}
                                                        user={user}
                                                        games={games}
                                                        teams={teams}
                                                        matches={matches}
                                                    />
                                                ))}
                                                {filteredUsers.length === 0 &&
                                                    <Typography color={theme.palette.text.primary} sx={{px:2}}>
                                                        該当するユーザーが見つかりませんでした
                                                    </Typography>
                                                }
                                            </Box>
                                        }
                                    </motion.div>
                                </TabPanel>

                                <TabPanel value={value} index={1}>
                                    <motion.div
                                        key={"overview-content"}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        {isSuccessful && (
                                            <Grid container spacing={1.5}>
                                                {matchSets
                                                    .map((matchSet, index) => {
                                                        return (
                                                            <>
                                                                <DiscoverTeamContent
                                                                    matchSet={matchSet}
                                                                    images={images}
                                                                    locations={locations}
                                                                    users={users}
                                                                    key={index}
                                                                />
                                                            </>
                                                        );
                                                    })}
                                            </Grid>
                                        )}
                                    </motion.div>
                                </TabPanel>

                            </Container>
                        </Box>
                        </TeamsContext.Provider>
                    </MatchesContext.Provider>
                </>
            )}
        </>
    )
}
