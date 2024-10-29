'use client'
import {Box, Container} from "@mui/material";

export default function Page({params}: { params: { id: string } }) {

    return (
        <Container maxWidth="lg">
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={4}>
                {/* First Component */}
                <Box flex={1}>
                    {/* コンポーネント1の内容をここに追加 */}
                    <Box>Component 1</Box>
                </Box>

                {/* Second Component */}
                <Box flex={1}>
                    {/* コンポーネント2の内容をここに追加 */}
                    <Box>Component 2</Box>
                </Box>
            </Box>
        </Container>

    );
}
