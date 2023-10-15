import {Stack, Typography} from "@mui/material";
import {useContext} from "react";
import * as React from "react";



export type RankProps = {
    rank: number;
}

export const Rank = (props: RankProps) => {

    if (props.rank == -1) {
        return (
            <>
                <Stack
                    direction={"row"}
                    alignItems={"flex-end"}
                    marginLeft={0.5}
                    spacing={1}
                >
                    <Typography sx={{color: "#FFF", fontSize: "24px", fontWeight: "bold"}}>
                        集計中
                    </Typography>
                </Stack>
            </>
        )
    } else {
        return (
            <>
                <Stack
                    direction={"row"}
                    alignItems={"flex-end"}
                    marginLeft={0.5}
                    spacing={1}
                >
                    <Typography sx={{color: "#FFF", fontSize: "24px", fontWeight: "bold"}}>
                        {props.rank}
                    </Typography>
                    <Typography sx={{color: "#99a5d6", fontSize: "14px", py: "5px"}}>
                        位
                    </Typography>
                </Stack>
            </>
        )
    }
}

export default Rank