import { myLogger } from './logger/logger';
import express from 'express';
import users from './routers/users';
import spots from './routers/spots';
import { devConfig } from './config';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errors';

const app = express();
const port = devConfig.port;

app.use(cors());
app.use(express.json());
app.use(myLogger);

app.use('/users', users);
app.use('/spots', spots);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
