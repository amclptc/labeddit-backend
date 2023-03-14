export type TUserDB = {
    id: string,
    name: string,
    email: string,
    password: String
};

export type TPostDB = {
    id: string ,
    creator_id: string,
    content: string, 
    likes: number,
    dislikes: number, 
    created_at: string,
    posted_at: string   
};

export type TLikesDislikesDB = {
    user_id: string,
    post_id: string,
    like: number
};


export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}
