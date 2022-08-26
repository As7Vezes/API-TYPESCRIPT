import { Router, Request, Response, NextFunction } from 'express'
import itemsRouter from './items.routes'
import locationRouter from './locations.routes'

const routes = Router()


routes.use('/', itemsRouter)
routes.use('/location', locationRouter)

export default routes

// function logRoutes(req: Request, res: Response, next: NextFunction){
//     const { method, baseUrl } = req

//     const response = `[${method.toUpperCase()}] ${baseUrl}`

//     console.log(response)

//     return next()
// }