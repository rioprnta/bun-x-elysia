const {PrismaClient} = require('@prisma/client')

const client = new PrismaClient();

const postToCreate = [
    {
        id: 1,
        title: "First Post",
        content: "Content from First Post"
    },
    {
        id: 2,
        title: "Second Post",
        content: "Content from Second Post"
    },
    {
        id: 3,
        title: "Third Post",
        content: "Content from Third Post"
    }
]

const seed = async (posts) => {
    
    for(let i = 0; i < posts.length; i++){
        console.log("Creating posts : ",posts[i])
        await client.post.upsert({
            where: {id: posts[i].id},
            update: posts[i],
            create: posts[i]
        })
    }

}

seed(postToCreate)
    .then(() => {
        console.log('Created/Updated posts successfully')
    })
    .catch((error) => {
        console.error("Error : ",error)
    })
    .finally(() => {
        client.$disconnect();
        console.log('Disconnect Prisma Client, exiting.')
    })