import express from 'express';
import {celebrate,Joi} from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import CompaniesController  from './controllers/CompaniesController';
import TrainingsController  from './controllers/TrainingsController';

const routes = express.Router();
const upload = multer(multerConfig);

const companiesController = new CompaniesController();
const trainingsController = new TrainingsController();

routes.get('/trainings',trainingsController.index );
routes.get('/companies',companiesController.index);
routes.get('/companies/:id', companiesController.show);


routes.post(
    '/companies',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),

        })
    },{
        abortEarly: false
    }),
    companiesController.create
);
export default routes;