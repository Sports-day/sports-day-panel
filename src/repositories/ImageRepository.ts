import {ApiClient} from "../lib/ApiClient";
import {Image} from "../models/ImageModel";

const getImages = async (): Promise<Image[]> => {
    const data = await ApiClient().get("/images")
    return data.data
}

const getImage = async (id: number): Promise<Image> => {
    const data = await ApiClient().get(`/images/${id}`)
    return data.data
}

const deleteImage = async (id: number): Promise<void> => {
    await ApiClient().delete(`/images/${id}`)
}

const createImage = async (omittedImage: Omit<Image, "id" | "createdAt">): Promise<Image> => {
    const data = await ApiClient().post(`/images`, omittedImage)
    return data.data
}

export type ImageRepository = {
    getImages: () => Promise<Image[]>,
    getImage: (id: number) => Promise<Image>,
    deleteImage: (id: number) => Promise<void>,
    createImage: (omittedImage: Omit<Image, "id" | "createdAt">) => Promise<Image>,
}

export const imageRepository: ImageRepository = {
    getImages,
    getImage,
    deleteImage,
    createImage,
}