import {ApiClient} from "../lib/ApiClient";
import {Image} from "../models/ImageModel";

const getImages = async (): Promise<Image[]> => {
    const {data} = await ApiClient.get("/images")
    return data.data
}

const getImage = async (id: Pick<Image, "id">): Promise<Image> => {
    const {data} = await ApiClient.get(`/images/${id}`)
    return data.data
}

const deleteImage = async (id: Pick<Image, "id">): Promise<void> => {
    const {data} = await ApiClient.delete(`/images/${id}`)
}

const createImage = async (omittedImage: Omit<Image, "id" | "createdAt" | "createdBy">): Promise<Image> => {
    const {data} = await ApiClient.post(`/images`, omittedImage)
    return data.data
}

export type ImageRepository = {
    getImages: () => Promise<Image[]>,
    getImage: (id: Pick<Image, "id">) => Promise<Image>,
    deleteImage: (id: Pick<Image, "id">) => Promise<void>,
    createImage: (omittedImage: Omit<Image, "id" | "createdAt" | "createdBy">) => Promise<Image>,
}

export const imageRepository: ImageRepository = {
    getImages,
    getImage,
    deleteImage,
    createImage,
}