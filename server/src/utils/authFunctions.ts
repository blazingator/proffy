import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function compareHash(passwd: string, userPasswd: string){
  return bcrypt.compare(passwd, userPasswd)
}

export function hashPassword(plainPasswd: string){
  const encPassword = bcrypt.hashSync(plainPasswd, 8)

  return encPassword
}

export function createToken(userId: number){
  return jwt.sign({ id: userId }, 'secret', {
    expiresIn: 86400
  })
}
