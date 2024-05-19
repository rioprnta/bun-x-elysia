import Elysia from "elysia";
import postRoutes from "./routes/posts";
import swagger from '@elysiajs/swagger'

const app = new Elysia()

app
  .use(swagger())
  .group('/api', (app) => app.use(postRoutes))
  .listen(process.env.PORT ?? 3000)

app
  .get('/home', () => 'hello world')
  .listen(3000) 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


/*OLD*/

// import { Elysia } from "elysia";

// const app = new Elysia()
//       .get("/", () => "Hello Elysia")
//       .get("/test", {
//         message:"Mantap"
//       })
// .listen(3000);


