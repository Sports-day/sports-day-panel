import {useFetchImage} from "../../../../src/features/images/hook";
import {Avatar} from "@mui/material";

export function SportIcon(props: { iconId: number }) {
    const {image} = useFetchImage(props.iconId)

    return (
        <>
            <Avatar
                sx={{
                    width: "200px",
                    height: "200px",
                }}
                src={image?.attachment}
            />
        </>
    )
}