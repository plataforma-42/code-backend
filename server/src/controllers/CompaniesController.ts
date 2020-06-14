import {Request,Response} from 'express'
import knex from '../database/connection';



class CompaniesController {

    async index(request: Request, response: Response){
        const {city,uf,items} = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))

        const points = await knex('companies')
            .join('company_training','companies.id', '=', 'company_training.company_id')
            .whereIn('company_training.training_id',parsedItems)
            .where('city',String(city))
            .where('uf',String(uf))
            .distinct()
            .select('companies.*');   
            
        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://10.10.0.10:3333/uploads/${point.image}`,
            };
        })    

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        const {id} =  request.params;

        const point = await knex('companies').where('id',id).first();

        if(!point){
            return response.status(400).json({message: 'Company not found'});
        }

        const serializedPoint = {
                ...point,
                image_url: `http://10.10.0.10:3333/uploads/${point.image}`,
        }  

        const items = await knex('training')
            .join('company_training',  'training.id', '=' , 'company_training.training_id')
            .where('company_training.company_id',id)
            .select('training.title');

        return response.json({point: serializedPoint,items});
    }

    async create (request: Request, response: Response)  {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
                } = request.body;
    
        const trx = await knex.transaction();  
        
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('companies').insert(point);
    
        const company_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((training_id: number )=> {
            return {
                training_id,
                company_id,
            };
        })
    
        await trx('company_training').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: company_id,
            ...point,   
        });
    }
}

export default CompaniesController;