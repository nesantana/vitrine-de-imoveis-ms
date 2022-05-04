import { Router } from 'express'
import CharacteristicsModel from '@models/CharacteristicsModel'
import { capitalize } from '@utils/capitalize'
import { verifyJWT } from '@utils/auth'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const characteristics = await CharacteristicsModel.findAll()

    res.send(characteristics)
  } catch (error) {
    res.status(500).json({ error: `Opss, algo deu errado enquanto buscávamos as características: ${error}` })
  }
})

router.post('/create', verifyJWT, async (req, res) => {
  const {
    value,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!value) {
    canKeep = false
    message.push('O campo "Nome" é obrigatório')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
    return
  }

  try {
    const valueCapitalize = capitalize(value)

    const findValue = await CharacteristicsModel.findOne({ where: { value: valueCapitalize } })

    if (findValue) {
      return res.status(500).json({ error: 'Característica já cadastrada.' })
    }

    try {
      await CharacteristicsModel.create({ value: valueCapitalize })

      return res.send('Característica criada com sucesso')
    } catch (error) {
      return res.status(500).json({ error: `Erro ao criar característica: ${error}` })
    }
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos criar essa característica agora, erro: ${error}` })
  }
})

export default router
