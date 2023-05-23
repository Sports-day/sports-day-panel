import {Box, Container, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";
import * as React from "react";
import {GameListContent} from "./GameListContent";
import {useContext} from "react";
import {GamesContext} from "../../context";

export type GameListProps = {
    sportId: number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                spacing={3}
                >
                   {children}
                </Stack>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const GameList = (props: GameListProps) => {
    const {data: games} = useContext(GamesContext)
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                paddingTop: "0px",
                position:"relative",
                bottom:"-40px"
            }}
        >
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={3}
                minHeight={"50vh"}
                sx={{
                    position: "relative",
                    width: "101vw",
                    height:"fit-content",
                    backgroundColor: "#23398a",
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={3}
                    width={"100vw"}
                >
                    <Stack
                        width={"100%"}
                        maxWidth={"xl"}
                        sx={{px:2, pb:3, pt:3}}
                        spacing={5}
                    >
                        <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                            対戦一覧
                        </Typography>
                        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant={"scrollable"}
                                scrollButtons={"auto"}
                                aria-label="basic tabs example"
                                TabIndicatorProps={{
                                    style: {
                                        zIndex: 0,
                                        backgroundColor: '#ffffff',
                                        borderRadius: '25px',
                                        height: '50px'
                                    }
                                }}
                            >
                                {games.map((game) => {
                                    return(
                                        <Tab sx={{zIndex:1, px:2, color:"#99a5d6", border:"1px solid #FFF", borderRadius:"24px"}} key={game.id} label={game.name} {...a11yProps(game.id)} />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        {games.map((game) => {
                            return(
                                <TabPanel key={game.id} value={value} index={game.id-1}>
                                    <GameListContent game={game}/>
                                </TabPanel>
                            )
                        })}

                    </Stack>
                    <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                        対戦が終了すると項目が追加されます
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    )
}