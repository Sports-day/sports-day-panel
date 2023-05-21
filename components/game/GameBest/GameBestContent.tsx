import {Divider, Stack, Typography} from "@mui/material";

export const GameBestContent = (props: any) => {
    const {rank, team} = props;
    return(
        <>
            <Divider/>
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
        </>
    )
}