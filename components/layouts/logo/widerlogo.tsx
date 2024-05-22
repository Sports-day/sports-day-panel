'use client'
import Widerlogo from "@/public/logo/widerlogotype.svg";
import {useTheme} from "@mui/material/styles";

export default function WiderLogo() {
    const theme = useTheme();
    return (
        <Widerlogo width={80*1.5} height={13*1.5} fill={theme.palette.text.disabled}/>
    )
}