import { Router } from 'express'
import knex from '../database/connection'

const locationRouter = Router()

locationRouter.post('/', async (req, res) => {

    const { 
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
     } = req.body

     const location = { 
        image: 'fake-image.jpg',
        name,
        email,
        whatsapp,  
        latitude,
        longitude,
        city,
        uf
     }

    const transaction = await knex.transaction()
  
    const newIds = await transaction('locations').insert(location)

    const location_id = newIds[0]

    const locationitems = items.map(async (item_id: number) => {
        const selectedItem = await transaction('items').where('id', item_id).first()

        if(!selectedItem){
            return res.status(400).json({ message: 'Item not found.' })
        }
        return {
            item_id,
            location_id
        }
    })

    await transaction('location_items').insert(locationitems)

    await transaction.commit()

    return res.json({
        id: location_id,
        ...location
    })
    
})


locationRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    
    const location = await knex('locations').where('id', id).first()

    if(!location){
        return res.status(400).json({ message: "Location not found. " })
    }

    const items = await knex('items')
        .join('location_items', 'items.id', '=', 'location_items.item_id')
        .where('location_items.location_id', id)
        .select('items.title')
    
    return res.json({ location, items })
})

export default locationRouter