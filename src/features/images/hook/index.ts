import {Image, imageFactory} from "../../../models/ImageModel";
import {useState} from "react";
import {useAsyncRetry} from "react-use";

export const useFetchImages = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await imageFactory().index();
            setImages(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        images: images,
        isFetching: isFetching,
        refresh: state.retry,
    }
}

export const useFetchImage = (imageId: number) => {
    const [image, setImage] = useState<Image>();
    const [isFetching, setIsFetching] = useState(true);

    const state = useAsyncRetry(async () => {
        try {
            setIsFetching(true);

            const data = await imageFactory().show(imageId);
            setImage(data);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    })

    return {
        image: image,
        isFetching: isFetching,
        refresh: state.retry,
    }
}