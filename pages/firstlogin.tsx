import {
    Avatar,
    Box, Button, Card, CardContent,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material"
import * as React from "react";
import {useSession} from "next-auth/react";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {useFetchUsers} from "../src/features/users/hook";

export const Firstlogin = () => {
    const {users} = useFetchUsers();
    const {data: session} = useSession();
    const theme = createTheme();

    const [name, setName] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value);
    };

    const defaultName = "デフォルト"

    return(
        <ThemeProvider theme={theme}>
            <Box
                sx={{ width: '100vw' , height: '100vh', overflow:'hidden'}}
            >
                <Container maxWidth={"xl"} disableGutters>
                    <Stack
                        spacing={2}
                    >
                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={1}
                            px={3}
                            pt={5}
                            pb={7}
                            width={"100%"}
                            sx={{backgroundColor:"#23398a"}}
                        >
                            <Box pb={2}>
                                <Avatar
                                    alt={session?.user?.name ?? "unknown"}
                                    sx={{
                                        height: "3.5em",
                                        width: "3.5em",
                                        backgroundColor: "#5664e3",
                                    }}
                                    src={"/"}
                                >
                                </Avatar>
                            </Box>
                            <Typography variant={"h5"} color={"white"}>
                                こんにちは、
                            </Typography>
                            <Typography variant={"h5"} color={"white"}>
                                {session?.user?.name ?? "unknown"}さん！
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
                <Container
                    maxWidth={"xl"}
                    disableGutters
                    sx={{px:1, py:3}}
                >
                    <Stack
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={1}
                        px={3}
                        pt={3}
                        pb={3}
                    >
                        <Typography fontSize={"16px"} pb={3}>
                            お名前が合っているか確認してください。
                        </Typography>
                        <FormControl variant="filled" sx={{ m: 10, width:"100%"}}>
                            <InputLabel id="demo-simple-select-autowidth-label">名前</InputLabel>
                            <Select
                                value={name}
                                onChange={handleChange}
                                autoWidth
                                label="名前"
                                sx={{color:"#23398A"}}
                            >

                                {/*//デフォルト名*/}
                                <MenuItem value={defaultName}>
                                    <em>{defaultName}</em>
                                </MenuItem>

                                {/*//ユーザー名リスト*/}
                                {users.map((user)=>{
                                    return(
                                        <MenuItem key={user.id} value={user.id}>{user?.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>

                        <Stack width={"100%"} pt={5}>
                            <Card>
                                <Button

                                    // onClick={}

                                    sx={{width:"100%"}}
                                >
                                    <CardContent sx={{width:"fit-content"}}>
                                        <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                            確認してはじめる
                                        </Typography>
                                    </CardContent>
                                </Button>
                            </Card>
                        </Stack>

                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Firstlogin;