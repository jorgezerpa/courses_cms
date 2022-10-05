import express, { Router, Response, Request } from 'express';

const router:Router = express.Router();

router.get('/', (req:Request, res:Response) => {
    res.json('categories list')
})

export default router;
