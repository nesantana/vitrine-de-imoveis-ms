import { Router } from 'express'
import FinancingModel from '@models/FinancingModel'
import { verifyJWT } from '@utils/auth'

const router = Router()

router.post('/', async (req, res) => {
  try {
    await FinancingModel.create({ ...req.body })

    return res.send('Em breve entraremos em contato')
  } catch (error) {
    res.status(500).json({ error: 'Opss, algo deu errado.' })
  }
})

router.get('/findAll', verifyJWT, async (req, res) => {
  try {
    const financing = await FinancingModel.findAll()

    return res.send(financing)
  } catch (error) {
    res.status(500).json({ error: 'Opss, algo deu errado.' })
  }
})

export default router
