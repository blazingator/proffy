import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import db from '../database/connection'
import
  { compareHash, hashPassword, createToken } 
from '../utils/authFunctions'

interface AuthRequest extends Request{
  userId: number
}

export default class UsersController{
  async createUserToken(req: Request, res: Response){
    const { email, password } = req.body

    try{
      const [ user ] = await db('users').where('email','=',email).select()

      if(!user) return res.status(400).json({ message: 'Usuário não cadastrado' })

      if(!(await compareHash(password, user.password))){
        return res.status(400).json({ message: 'Senha inválida' })
      }

      return res.json({
        user,
        token: createToken(user.id)
      })
      
    }catch(err){
      return res.status(400).json({ message: "Autenticação falhou" })
    }
  }

  async fetchUserInfo(req: Request, res: Response){
    const aReq = req as AuthRequest
    const { userId } = aReq
    
    try{
      const [ user ] = await db('users').where('id','=',userId).select()

      if(!user) return res.status(404).json({ message: 'Usuário não encontrado' })
      
      return res.json(user)
    }catch(err){
      
      return res.status(400).json({ message: 'Ocorreu um erro' })
    }
  }

  async create(req: Request, res: Response){
    const { 
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password
    } = req.body

    if(password.length < 8){
      return res.status(400).json({ warn: 'Password', message: 'Senha de no minimo 8 caracteres' })
    }
    
    try{
      const user = await db('users').where('email', '=', email)
        .select('email')
      if(user[0]){
        return res.status(400).json({ type: 'error', message: 'Email já cadastrado' })
      }

      const encPassword = hashPassword(password)

      const createUser = {
        email,
        password: encPassword,
        name,
        avatar,
        whatsapp,
        bio
      }
      await db('users').insert(createUser)
       
      return res.status(201).send()
    }catch(err){
      return res.status(400).json({ type: 'error', message: 'Ocorreu um erro' })
    }
  }
}
