import express from 'express';
import { mailController } from './controller';

const mailRouter = express();

mailRouter.use("/api/mail", mailController);
export default mailRouter;