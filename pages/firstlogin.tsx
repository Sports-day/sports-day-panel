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
import {useSession} from "next-auth/react";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../components/theme";
import {useFetchUsers} from "../src/features/users/hook";
import {MicrosoftAccount, microsoftAccountFactory} from "../src/models/MicrosoftAccountModel";
import {useState} from "react";
import {useRouter} from "next/router";

export const FirstLogin = (props: { microsoftAccount: MicrosoftAccount }) => {
    const router = useRouter()
    const {data: session} = useSession();
    const theme = createTheme();
    const {users} = useFetchUsers();
    //  state
    const [studentId, setStudentId] = useState<string>(props.microsoftAccount?.mailAccountName ?? "-1");

    const handleChange = (event: SelectChangeEvent) => {
        setStudentId(event.target.value);
    };

    const handleLinkLater = async () => {
        await microsoftAccountFactory().linkLater("me")

        //  reload
        router.reload()
    }

    const handleLinkUser = async () => {
        if (studentId === "-1") {
            alert("自分の名前を選択してください")
            return
        }

        const user = users.find(user => user.studentId === studentId)
        if (!user) {
            alert("ユーザーが見つかりませんでした")
            return
        }

        //  link
        await microsoftAccountFactory().linkUser("me", user.id)

        //  reload
        router.reload()
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{width: '100vw', height: '100vh', overflow: 'hidden'}}
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
                            sx={{backgroundColor: "#23398a"}}
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
                    sx={{px: 1, py: 3}}
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
                        <FormControl variant="filled" sx={{m: 10, width: "100%"}}>
                            <InputLabel id="demo-simple-select-autowidth-label">名前</InputLabel>
                            <Select
                                value={studentId}
                                onChange={handleChange}
                                autoWidth
                                label="名前"
                                sx={{color: "#23398A"}}
                            >

                                {/*//デフォルト名*/}
                                <MenuItem value={"-1"}>
                                    <em>自分の名前を選択してください</em>
                                </MenuItem>

                                {/*//ユーザー名リスト*/}
                                {users.map((user) => {
                                    return (
                                        <MenuItem key={user.id} value={user.studentId}>{user.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>

                        <Stack width={"100%"} pt={5}>
                            <Card>
                                <Button
                                    onClick={handleLinkUser}
                                    sx={{width: "100%"}}
                                >
                                    <CardContent sx={{width: "fit-content"}}>
                                        <Typography sx={{color: "#FFF", fontSize: "16px"}}>
                                            確認してはじめる
                                        </Typography>
                                    </CardContent>
                                </Button>
                            </Card>
                            <Box pt={2} alignSelf={"center"}>
                                <Button
                                    onClick={handleLinkLater}
                                    sx={{py: 1, px: 2, width: "fit-content"}}
                                >
                                    <Typography sx={{fontSize: "16px", color: "23398A"}}>あとで設定</Typography>
                                </Button>
                            </Box>
                        </Stack>

                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default FirstLogin;