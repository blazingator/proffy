import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

interface Decoded{
  id: number
  iat: number
  exp: number
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization

  if(!authHeader){
    return res.status(400).json({ message: 'Nenhum token informado' })
  }

  const [scheme, token] = authHeader.split(" ")

  try{
    const decoded  = await promisify(jwt.verify)(token, "secret") as Decoded

    req.userId = decoded.id as number

    return next()
  }catch(err){
    return res.status(400).json({ message: 'Token inválido' })
  }
}
