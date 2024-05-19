import { Elysia, t } from "elysia"
import { getPosts, getPostsById, postNewCreate, updatePost, deletePost } from "./handlers";

const app = new Elysia({ prefix: '/posts' });

const postRoutes = app
    .get('/', () => getPosts())
    .get('/:id', ({ params: { id } }) => getPostsById(id),
        {
            params: t.Object({
                id: t.Numeric(),
            })
        })
    .post('/', ({ body }) => postNewCreate(body),
        {
            body: t.Object({
                title: t.String({
                    minLength: 3,
                    maxLength: 50
                }),
                content: t.String({
                    minLength: 3,
                    maxLength: 50
                }),
            })
        })
    .patch('/:id', ({ params: { id }, body }) => updatePost(id, body),
        {
            params: t.Object({
                id: t.Numeric()
            }),
            body: t.Object({
                title: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50
                })),
                content: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50
                })),
            })
        })
    .delete('/:id', ({ params: { id } }) => deletePost(id),
        {
            params: t.Object({
                id: t.Numeric()
            })
        });

export default postRoutes