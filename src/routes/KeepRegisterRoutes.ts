import { Router } from 'express'
import KeepRegisterModel from '@models/KeepRegisterModel'
import UsersModel from '@models/UsersModel'
import { parseInfo } from '@utils/parseInfo'

const router = Router()

router.post('/', async (req, res) => {
  const { email } = req.body

  try {
    const user = await UsersModel.findOne({ where: { email } })

    if (parseInfo(user)) {
      return res.status(500).json({ error: 'E-mail já cadastrado na plataforma.' })
    }

    await KeepRegisterModel.create({ email })

    return res.send('Pode se cadastrar')
  } catch (error) {
    res.status(500).json({ error: 'Não consigo validar este e-mail agora.' })
  }
})

export default router
