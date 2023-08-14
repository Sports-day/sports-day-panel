import {Button, Stack, SvgIcon, Typography} from "@mui/material";
import {HiArrowLeftCircle, HiEllipsisHorizontalCircle} from "react-icons/hi2";
import * as React from "react";

export const runtime = 'experimental-edge';

export const MiddleNav = (props:any) => {
    const router=props;
    return(
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Button onClick={() => router.back()}>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    spacing={1}
                    sx={{
                        padding:1,
                        py:3,
                        color:"#23398A",
                        "@media (prefers-color-scheme: dark)": {
                            color:"#99a5d6"
                        }
                    }}
                >
                    <SvgIcon>
                        <HiArrowLeftCircle/>
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
                    sx={{
                        padding:1,
                        py:3,
                        color:"#23398A",
                        "@media (prefers-color-scheme: dark)": {
                            color:"#99a5d6"
                        }
                    }}
                >
                    <Typography>
                        ルールを見る
                    </Typography>
                    <SvgIcon>
                        <HiEllipsisHorizontalCircle/>
                    </SvgIcon>
                </Stack>
            </Button>
        </Stack>
    )
}
export default MiddleNav;