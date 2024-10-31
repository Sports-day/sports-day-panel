import {Box, Stack, Typography} from "@mui/material";
import SportsList from "@/components/sports/sportsList";
import {sportFactory} from "@/src/models/SportModel";
import InfoCircleContainer from "@/components/information/layout/infoCircleContainer";

export default async function Page() {
    const sports = await sportFactory().index()

    return (
        <>
            <Box
                component="main"
                sx={{
                    width: '100vw',
                    overflowX: 'hidden',
                }}
            >
                <InfoCircleContainer/>

                <Stack spacing={15}>
                    <Typography variant="h4" fontWeight={"600"} align={"center"}>
                        競技を選ぶ
                    </Typography>
                    <SportsList sports={sports}/>
                </Stack>
            </Box>
        </>
    )
}
