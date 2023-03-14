import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { db } from './database/knex'
import { TLikesDislikesDB, TPostDB, TUserDB } from './types'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.use("/users", userRouter)

//users
app.get("/users", async (req: Request, res: Response) => {
    try{
        const q = req.query.q as string | undefined;

        if(q === undefined){
            const result = await db('users');
            res.status(200).send(result);
        } else {
            const result = await db('users').where('name', 'LIKE', `${q}`);
            res.status(200).send(result);
        }
    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.post("/users", async (req: Request, res: Response) => {
    try{
        const { id, name, email, password} = req.body

        if(typeof id !== 'string'){
            res.status(400);
            throw new Error('id deve ser string!');
        };

        if(typeof name !== 'string'){
            res.status(400);
            throw new Error('name deve ser string!');
        };

        if(typeof email !== 'string'){
            res.status(400);
            throw new Error('email deve ser string!');
        };

        if(typeof password !== 'string'){
            res.status(400);
            throw new Error('name deve ser string!');
        };

        const [userIdExists] : TUserDB[] = await db('users').where({id});

        if(userIdExists){
            res.status(400);
            throw new Error('id já existe');
        };

        const [userEmailExists] : TUserDB[] = await db('users').where({email});

        if(userEmailExists){
            res.status(400);
            throw new Error('email já existe');
        };

        const newUser : TUserDB = {
            id, 
            name,
            email,
            password
        };

        await db('users').insert(newUser)

        res.status(201).send({
            message: 'User criado com suceosso!',
            user: newUser
        });

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id;

        const [userExists] : TUserDB[] = await db('users').where({id: idToDelete})

        if(!userExists){
            res.status(404)
            throw new Error('id não encontrado')
        }

        await db('likes_dislikes').del().where({user_id: idToDelete});

        await db('users').del().where({id: idToDelete});

        res.status(200).send({message: 'user deletado com sucesso'});

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});


//posts
app.get("/posts", async (req: Request, res: Response) => {
    try{
        const q = req.query.q as string | undefined;

        if(q === undefined){
            const result = await db('posts');
            res.status(200).send(result);
        } else {
            const result = await db('posts').where('id', 'LIKE', `${q}`);
            res.status(200).send(result);
        }
    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.post("/posts", async (req: Request, res: Response) => {
    try{
        const { id, content } = req.body

        if(typeof id !== 'string'){
            res.status(400);
            throw new Error('id deve ser string!');
        };

        if(typeof content !== 'string'){
            res.status(400);
            throw new Error('name deve ser string!');
        };

        const [postIdExists] : TUserDB[] = await db('users').where({id});

        if(postIdExists){
            res.status(400);
            throw new Error('id já existe');
        };

        const newPost  = {
            id,
            content
        };

        await db('posts').insert(newPost);

        const [insertPost] : TPostDB[] = await db('posts').where({id});

        res.status(201).send({
            message: 'Post criado com suceosso!',
            post: insertPost
        });

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.put("/posts/:id", async (req: Request, res: Response) => {
    try{
        const idToEdit = req.params.id;

        const id = req.body.id;
        const content = req.body.content;

        if(id !== undefined){
            if(typeof id !== 'string'){
                res.status(400);
                throw new Error('id deve ser string!');
            };
        };

        if(content !== undefined){
            if(typeof content !== 'string'){
                res.status(400);
                throw new Error('content deve ser string!');
            };
        };

        const [post] = await db('users').where({id: idToEdit});

        if(!post){
            res.status(404);
            throw new Error('id não encontrada');
        };

        const newPost  = {
            id: id | post.id,
            content: content | post.content
        };

        await db('posts').update(newPost).where({id: idToEdit});

        res.status(200).send({
            message: 'Post criado com suceosso!',
            post: newPost
        });

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.delete("/posts/:id", async (req: Request, res: Response) => {
    try{
        const idToDelete = req.params.id;

        const [postExists] : TPostDB[] = await db('posts').where({id: idToDelete})

        if(!postExists){
            res.status(404)
            throw new Error('id não encontrado')
        }

        await db('likes_dislikes').del().where({post_id: idToDelete});

        await db('posts').del().where({id: idToDelete});

        res.status(200).send({message: 'post deletado com sucesso'});

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});


//likes_dislikes
app.post("/posts/:postsId/users/:userId", async (req: Request, res: Response) => {
    try{
        const postId = req.params.postsId;
        const userId = req.params.userId;

        const [postExists] : TPostDB[] = await db('posts').where({id: postId})

        if(!postExists){
            res.status(404)
            throw new Error('id do post não encontrado')
        }

        const [userExists] : TUserDB[] = await db('users').where({id: userId});

        if(!userExists){
            res.status(404);
            throw new Error('id do usuário não encontrada');
        }

        const newLike: TLikesDislikesDB = {
            user_id: userId,
            post_id: postId,
            like: 1
        };

        await db('likes_dislikes').insert(newLike)

        res.status(201).send({message: 'like/dislike dado com sucesso'})

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.delete("/posts/:postsId/users/:userId", async (req: Request, res: Response) => {
    try{
        const postId = req.params.postsId;
        const userId = req.params.userId;

        const [postExists] : TPostDB[] = await db('posts').where({id: postId})

        if(!postExists){
            res.status(404)
            throw new Error('id do post não encontrado')
        }

        const [userExists] : TUserDB[] = await db('users').where({id: userId});

        if(!userExists){
            res.status(404);
            throw new Error('id do usuário não encontrada');
        }

        await db('likes_dislikes').del().where({post_id: postId}).andWhere({user_id: userId});

        res.status(201).send({message: 'like/dislike dado com sucesso'})

    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

app.get("/posts/users/", async (req: Request, res: Response) => {
    try{
        const posts: TPostDB[] = await db('posts');

        const result: any = [];

        for(let post of posts){
            const likeDislikes = [];

            const users_posts : TLikesDislikesDB[] = await db('likes_dislikes').where({post_id: post.id});

            for(let user_post of users_posts){
                const [user]: TUserDB[] = await db('users').where({id: user_post.user_id});

                likeDislikes.push(user);
            }

            result.push({
                ...post,
                likeDislikes
    
            })
    
        }

        res.status(200).send(result);
    } catch(error){
        console.log(error)

        if(req.statusCode === 200) {
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send('Erro inesperado!');
        };
    };
});

