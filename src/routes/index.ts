import { Router, Request, Response, NextFunction } from 'express'

const routes = Router()

function logRoutes(req: Request, res: Response, next: NextFunction){
    const { method, baseUrl } = req

    const response = `[${method.toUpperCase()}] ${baseUrl}`

    console.log(response)

    return next()
}

routes.get('/', logRoutes, (req: Request, res: Response) => {
    return res.json({ message: 'Olá dev!'})
})

export default routes