import { Router } from 'express'

// Models
import DefaultModel from '@models/Default'
import { readToken } from '@utils/token'

const router = Router()

router.get('/', async (req, res) => {
  const { auth, user } = readToken(req.headers.authorization)

  if (!auth) {
    return res.status(401).json({ error: 'Usuário não autorizado!' })
  }

  try {
    const myUser: any = await DefaultModel.findOne({ where: { id: user } })

    const myUserFormated = JSON.parse(JSON.stringify(myUser))

    return res.send(myUserFormated)
  } catch (error) {
    return res.status(500).json({ error: 'Não conseguimos retornar seus dados agora.' })
  }
})

export default router
