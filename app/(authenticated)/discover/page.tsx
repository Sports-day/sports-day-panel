'use client'
import {
    Avatar,
    Box,
    Container,
    Stack, SvgIcon, Typography,
    Unstable_Grid2 as Grid,
    TextField,
    useTheme
} from "@mui/material";
import * as React from "react";
import {Navigation} from "@/components/layouts/navigation";
import {useFetchTeamSetsInMyClass} from "@/src/features/unit/discover";
import {Loading} from "@/components/layouts/loading";
import {motion} from "framer-motion";
import {HiSearch} from "react-icons/hi";
import {useFetchLocations} from "@/src/features/locations/hook";
import {useFetchImages} from "@/src/features/images/hook";
import {DiscoverTeamContent} from "@/components/discover/DiscoverTeamContent";
import {OtherInfo} from "@/components/dashboard/Overview/OtherInfo";
import CircleContainer from "@/components/layouts/circleContainer";
import {useFetchUsers} from "@/src/features/users/hook";
import {useFetchTeams} from "@/src/features/teams/hook";
import {useFetchGames} from "@/src/features/games/hook";
import {DiscoverUser} from "@/components/discover/discoverUser";
// import {Metadata} from "next";

// export const metadata: Metadata = {
//     title: 'SPORTSDAY : Discover',
// }

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

    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()

    const [searchText, setSearchText] = React.useState("");
    const filteredUsers = searchText
        ? users.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
        : [];

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
                        <Box
                            component={"main"}
                            minHeight={"96vh"}
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
                                sx={{px: 2, py: 3,mb:5, mt: "-100px"}}
                            >

                                {/* Add a TextField for the search */}
                                <Box
                                    px={0}
                                    py={0}
                                    mb={"8px"}
                                    sx={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        backgroundColor: `${theme.palette.secondary.light}33`,
                                        border: `1px solid ${theme.palette.secondary.dark}66`,
                                    }}>
                                    <TextField
                                        color={"info"}
                                        fullWidth
                                        value={searchText}
                                        onChange={event => setSearchText(event.target.value)}
                                        placeholder="名前を入力"
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
                                            backgroundColor: `${theme.palette.secondary.dark}1A`,
                                            border: `1px solid ${theme.palette.secondary.dark}66`,
                                        }}>
                                        {/* List the names of the filtered users */}
                                        {filteredUsers.map(user => (
                                            <DiscoverUser
                                                key={user.id}
                                                user={user}
                                            />
                                        ))}
                                    </Box>
                                }
                                        <Typography sx={{px:2}} fontSize={"18px"}>
                                            同じクラスの試合一覧
                                        </Typography>
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
                                        {isSuccessful && (
                                            <OtherInfo infoName={""}
                                                       infoContent={"探す機能が一部使用できない可能性があります"}
                                                       infoSubContent={"どの競技にも参加していません。参加予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                        )}
                            </Container>
                        </Box>
                </>
            )}
        </>
    )
}
