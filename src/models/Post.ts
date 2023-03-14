import { PostDB, PostModel } from "../types";

export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string, 
        private likes: number,
        private dislikes: number, 
        private createdAt: string,
        private postedAt: string   
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getPostedAt(): string {
        return this.postedAt
    }

    public setPostedAt(value: string): void {
        this.postedAt = value
    }

    public toDBModel(): PostDB {
        return{
            id: this.id,
            creator_id: this.creatorId,
            content: this.content, 
            likes: this.likes,
            dislikes: this.dislikes, 
            created_at: this.createdAt,
            posted_at: this.postedAt
        }
    }

    public toBusinessModel(): PostModel{ 
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content, 
            likes: this.likes,
            dislikes: this.dislikes, 
            created_at: this.createdAt,
            posted_at: this.postedAt 
        }
    }

}