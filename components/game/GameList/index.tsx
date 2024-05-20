import {Box, Container, Divider, Stack, Tab, Tabs, Typography, useTheme} from "@mui/material";
import * as React from "react";
import {GameListContent} from "./GameListContent";
import {useEffect} from "react";
import {motion} from "framer-motion";
import {Game} from "@/src/models/GameModel";

export type GameListProps = {
    games: Game[]
    gameId: number | null
    setGameId: (gameId: number) => void
    myTeamId?: number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

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
                    spacing={1}
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
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const sortedGame = props.games.sort((a, b) => b.weight - a.weight)

    useEffect(() => {
        //  set tab value if game id not undefined
        if (props.gameId) {
            const index = sortedGame.findIndex(game => game.id === props.gameId)
            if (index !== -1) {
                setValue(index)
            }
        }
    }, [sortedGame, props.gameId])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        //  set game id if tab value not undefined
        if (sortedGame[newValue]) {
            props.setGameId(sortedGame[newValue].id)
        }
    };


    return (
        <Stack
            spacing={2}
            pb={2}
        >
            <Typography pl={2}>
                この競技の試合
            </Typography>
            <Box sx={{
                position: "relative",
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant={"scrollable"}
                    scrollButtons={false}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        style: {
                            zIndex: 0,
                            backgroundColor: `${theme.palette.text.primary}CC`,
                            borderRadius: '15px',
                            height: '49px',
                        }
                    }}
                >
                    {sortedGame.map((game, index) => {
                        return (
                            <Tab sx={{
                                zIndex: 1,
                                mr: 1,
                                color: `${theme.palette.text.primary}FF`,
                                border: `1px solid ${theme.palette.text.primary}4D`,
                                borderRadius: "15px"
                            }} key={game.id} label={game.name} {...a11yProps(index)} />
                        )
                    })}
                </Tabs>
            </Box>
            {sortedGame.map((game, index) => {
                return (
                    <TabPanel key={game.id} value={value} index={index}>
                        <motion.div
                            key={"overview-content"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
                        >
                            <GameListContent game={game} myTeamId={props.myTeamId}/>
                        </motion.div>
                    </TabPanel>
                )
            })
            }
        </Stack>
    )
}