import UsersModel from '@models/UsersModel'
import jwt from 'jsonwebtoken'
import { Credentials } from './constants'
import { parseInfo } from './parseInfo'

export const verifyJWT = (req: any, res: any, next: any) => {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).json({ auth: false, message: 'Usuário não autenticado.' })

  jwt.verify(token, Credentials.secret, async (err: any, decoded: any) => {
    if (err) return res.status(500).json({ auth: false, message: 'Erro no token.' })

    const user = await UsersModel.findOne({ where: { id: decoded.id } })

    if (!Number(parseInfo(user).access)) {
      return res.status(401).json({ auth: false, message: 'Usuário pendente de pagamento.' })
    }

    req.userId = decoded.id
    return next()
  })

  return null
}
