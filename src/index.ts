import { myLogger } from './logger/logger';
import express from 'express';
import users from './routers/users';
import { devConfig } from './config';
import cors from 'cors';
import { error500Middleware } from './middlewares/errors';

const app = express();
const port = devConfig.port;

app.use(cors());
app.use(express.json());

app.use(myLogger);
app.use('/users', users);

app.use(error500Middleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
