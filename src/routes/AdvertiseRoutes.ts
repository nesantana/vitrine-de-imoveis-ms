import { Router } from 'express'
import AdvertiseModel from '@models/AdvertiseModel'
import { verifyJWT } from '@utils/auth'

const router = Router()

router.post('/', async (req, res) => {
  try {
    await AdvertiseModel.create({ ...req.body })

    return res.send('Em breve entraremos em contato')
  } catch (error) {
    res.status(500).json({ error: 'Opss, algo deu errado.' })
  }
})

router.get('/findAll', verifyJWT, async (req, res) => {
  try {
    const advertise = await AdvertiseModel.findAll()

    return res.send(advertise)
  } catch (error) {
    res.status(500).json({ error: 'Opss, algo deu errado.' })
  }
})

export default router
