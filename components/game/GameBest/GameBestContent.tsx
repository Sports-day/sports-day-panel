import {Divider, Stack, Typography} from "@mui/material";

export const GameBestContent = (props: { rank: number, team: string }) => {
    const {rank, team} = props;
    return(
        <>
            <Stack
                alignItems={"flex-start"}
                direction={"row"}
                justifyContent={"space-between"}
            >
                <Typography>
                    {rank}位
                </Typography>
                <Typography>
                    {team}
                </Typography>
            </Stack>
            {rank !== 3 && <Divider/>}
        </>
    )
}