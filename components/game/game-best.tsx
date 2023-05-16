import {Card, CardContent, Divider, Stack, Typography}from "@mui/material";
export const GameBest = (props:any) => {
    const {value1, value2, value3} = props;
    return(
        <Card sx={{height: "260px"}}>
            <CardContent>
                <Stack
                    spacing={2}
                >
                    <Typography
                        color={"textSecondary"}
                        sx={{pb: "10px", fontSize: "16px"}}
                    >
                        競技内ベスト3
                    </Typography>
                    <Stack
                        alignItems={"flex-start"}
                        direction={"row"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant={"h6"}>
                            1位
                        </Typography>
                        <Typography variant={"h6"}>
                            {value1}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack
                        alignItems={"flex-start"}
                        direction={"row"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Typography>
                            2位
                        </Typography>
                        <Typography>
                            {value2}
                        </Typography>
                    </Stack>
                    <Divider/>
                    <Stack
                        alignItems={"flex-start"}
                        direction={"row"}
                        justifyContent={"space-between"}
                        spacing={3}
                    >
                        <Typography>
                            3位
                        </Typography>
                        <Typography>
                            {value3}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};