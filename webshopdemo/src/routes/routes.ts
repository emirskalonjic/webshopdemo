import { Router, Request, Response } from 'express';
import { APIGW } from '../app/apigw';

const router = Router();
const apigw = new APIGW();

router.get('/', apigw.home);
router.get('/about', apigw.about);

export { router }; 