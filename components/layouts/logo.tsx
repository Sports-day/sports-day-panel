import Image from "next/image";
import PropTypes from "prop-types";

export const SDLogo = (props: any) => {
    const {w} = props;
    return (
        <>
            <Image src={"public/logo.svg"} alt="logo" height={w*8.45} width={w} priority />
        </>
    );
};

SDLogo.propTypes = {
    w: PropTypes.object
};