'use client'
import {
    Avatar,
    Box,
    Container,
    Stack, SvgIcon, Typography,
    Unstable_Grid2 as Grid,
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
        users,
        matchSets
    } = useFetchTeamSetsInMyClass()

    const {images, isFetching: isFetchingImages} = useFetchImages()
    const {locations, isFetching: isFetchingLocations} = useFetchLocations()

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
                                    <Typography variant={"h5"}>
                                        試合を探す
                                    </Typography>
                                </Stack>
                            </CircleContainer>

                            <motion.div
                                key={"discover-content"}
                                initial={{opacity: 0, y: "50px"}}
                                animate={{opacity: 1, y: "0px"}}
                                transition={{delay:0.5, duration: 1, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <Container
                                    maxWidth={"xl"}
                                    disableGutters
                                    sx={{px: 1, py: 3, mt:"-100px"}}
                                >
                                    <Stack
                                        direction={"column"}
                                        justifyContent={"space-between"}
                                        spacing={3}
                                    >
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
                                        {!isSuccessful && (
                                            <OtherInfo infoName={""}
                                                       infoContent={"ブラウズ機能はご利用いただけません。"}
                                                       infoSubContent={"どの競技にも参加していないため、同じクラスの試合はご覧いただけません。競技に参加する予定にも関わらずこのメッセージが表示されている場合は、お近くのスタッフにお伝えください。"}/>
                                        )}
                                    </Stack>
                                </Container>
                            </motion.div>
                        </Box>
                </>
            )}
        </>
    )
}
