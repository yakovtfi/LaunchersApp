import express from 'express';
import launcherRouter from './routers/launcherRouter.js';
import userRouter from './routers/userRouter.js';
import cors from 'cors';
import { connectMongoData } from './config/mongoData.js';
import { PORT } from './config/server.js';


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/launchers', launcherRouter)
app.use('/api/auth', userRouter)


connectMongoData().then((connect)=> {
    if(connect) {
        app.listen(PORT, () =>{
            console.log(`connect to server http://localhost:${PORT}`);
        })
    }

})