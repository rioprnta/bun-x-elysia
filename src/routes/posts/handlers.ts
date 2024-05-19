import { InternalServerError, NotFoundError } from 'elysia';
import db from '../../db'

export async function getPosts() {
    try {
        const post = await db.post.findMany({ orderBy: { createdAt: 'asc' } });
        return JSON.stringify({
            message: 'Success',
            status: 200,
            data: post
        })
    } catch (e: unknown) {
        console.log(`Error getting posts : ${e}`);
    }
}

export async function getPostsById(id: number) {
    try {
        const post = await db.post.findUnique({ where: { id } })

        if (!post) {
            throw new NotFoundError(JSON.stringify({
                message: `Post not found by id : ${id}`
            }))
        }
        return JSON.stringify({
            message: `Success`,
            status: 200,
            data: post
        });
    } catch (e: unknown) {
        throw e;
    }
}

export async function postNewCreate(options: {title: string, content: string }) {
    try {
        const {title, content } = options
        const post = await db.post.create({ data: { title, content } });

        return JSON.stringify({
            message: 'Success',
            status: 200,
            data: post
        });
    } catch (e: unknown) {
        console.log(`Error create new post : ${e}`);
    }
}

export async function updatePost(id:number, options: {title?: string, content?: string}) {
    try {
        const {title, content} = options;

        const post = await db.post.update({
            where: {id},
            data: {
                ...(title? {title}: {}),
                ...(content? {content}: {}),
            }
        })
        return JSON.stringify({
            message: 'Success',
            status: 200,
            data: post
        });
    } catch (e: unknown) {
        throw new NotFoundError(`Error update post : ${e}`)
    }
}

export async function deletePost(id: number){
    try {
        const post = await db.post.delete({
            where: {id}
        })
        return JSON.stringify({
            message: 'Success',
            status: 200,
            data: post
        });
    } catch (e: unknown) {
        console.log(`Error delete post : ${e}`);
    }
}