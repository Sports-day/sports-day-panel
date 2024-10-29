'use client'
import {Box, Container} from "@mui/material";
import LeftCircleContainer from "@/components/layouts/leftCircleContainer";

export default function Page({params}: { params: { id: string } }) {

    return (
        <div style={{position: 'relative'}}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                <LeftCircleContainer/>
            </Box>


            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={4}
                >
                    {/* First Component */}
                    <Box flex={1}>
                        <Box>Component 1</Box>
                    </Box>

                    {/* Second Component */}
                    <Box flex={1}>
                        <Box>Component 2</Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
