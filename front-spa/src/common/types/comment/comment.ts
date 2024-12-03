export type CommentT = {
    id: string;
    owner: { username: string, id: number };
    text: string;
    createdAt: Date;
};