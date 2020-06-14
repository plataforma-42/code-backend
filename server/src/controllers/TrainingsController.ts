import { Request, Response } from 'express'
import knex from '../database/connection';

class TrainingsController {

    async index (request: Request, response: Response) {
        const items = await knex('training').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://10.10.0.10:3333/uploads/${item.image}`,
            };
        })
    
    
    
        return response.json(serializedItems);
    }

}

    export default TrainingsController;