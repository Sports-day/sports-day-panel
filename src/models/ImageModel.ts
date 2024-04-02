import {ImageRepository, imageRepository} from "../repositories/ImageRepository";

export type Image = {
    id: number,
    data: string,
    createdAt: string,
}

export const imageFactory = (repo?: ImageRepository) => {
    const repository = repo ?? imageRepository

    return {
        index: async (): Promise<Image[]> => {
            return await repository.getImages()
        },
        show: async (id: number): Promise<Image> => {
            return await repository.getImage(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteImage(id)
        },
        create: async (omittedImage: Omit<Image, "id" | "createdAt">): Promise<Image> => {
            return await repository.createImage(omittedImage)
        }
    }
}