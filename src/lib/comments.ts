export interface BlogComment {
    id: string
    authorName: string
    body: string
    createdAt: string
}

export interface CommentSubmission {
    authorName: string
    body: string
    website?: string
}
