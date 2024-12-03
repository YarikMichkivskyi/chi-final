export type AllExhibit = {
    id: number
    imageUrl: string
    description: string
    owner: {
        id: number
        username: string
    }
    commentCount: number
    createdAt: string
}