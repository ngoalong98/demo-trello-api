import express from 'express';
import { HttpStatusCode } from '*/utilities/constants';
import { boardRoutes } from './board.route';
import { columnRoutes } from './column.route';
import { cardRoutes } from './card.route';


const router = express.Router();
//get v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK!'
}));

//board api
router.use('/boards', boardRoutes);

//column api
router.use('/columns', columnRoutes);

//card api
router.use('/cards', cardRoutes);

export const apiV1 = router;