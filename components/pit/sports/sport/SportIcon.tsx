import {useFetchImage} from "../../../../src/features/images/hook";
import {Avatar} from "@mui/material";
import {Image} from "../../../../src/models/ImageModel";

export function SportIcon(props: { icon?: Image }) {
    return (
        <>
            <Avatar
                sx={{
                    width: "200px",
                    height: "200px",
                }}
                src={props.icon?.attachment}
            />
        </>
    )
}