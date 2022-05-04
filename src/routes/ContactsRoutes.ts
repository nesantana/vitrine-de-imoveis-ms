import { Router } from 'express'
import ContactsModel from '@models/ContactsModel'
import { capitalize } from '@utils/capitalize'
import { verifyJWT } from '@utils/auth'
import UsersModel from '@models/UsersModel'
import { parseInfo } from '@utils/parseInfo'

const router = Router()

router.get('/', verifyJWT, async (req: any, res) => {
  const { userId } = req

  try {
    const contacts = await ContactsModel.findAll({ where: { id_professional: userId } })

    res.send(contacts)
  } catch (error) {
    res.status(500).json({ error: `Opss, algo deu errado enquanto buscávamos os contatos : ${error}` })
  }
})

router.post('/create', verifyJWT, async (req, res) => {
  const {
    title_propertie,
    id_properties,
    id_professional,
    name,
    email,
    phone,
    preference,
    message,
  } = req.body

  let canKeep: boolean = true
  const messages: string[] = []

  if (!title_propertie) {
    canKeep = false
    messages.push('O campo "Título do Imóvel" é obrigatório')
  }

  if (!id_properties) {
    canKeep = false
    messages.push('O campo "Imóvel" é obrigatório')
  }

  if (!id_professional) {
    canKeep = false
    messages.push('O campo "Corretor" é obrigatório')
  }

  if (!name) {
    canKeep = false
    messages.push('O campo "Nome" é obrigatório')
  }

  if (!email) {
    canKeep = false
    messages.push('O campo "E-mail" é obrigatório')
  }

  if (!phone) {
    canKeep = false
    messages.push('O campo "Telefone" é obrigatório')
  }

  if (!preference) {
    canKeep = false
    messages.push('O campo "Preferencias" é obrigatório')
  }

  if (!message) {
    canKeep = false
    messages.push('O campo "Mensagem" é obrigatório')
  }

  if (!canKeep) {
    res.status(422).json({
      error: messages,
    })
    return
  }

  try {
    await ContactsModel.create({
      title_propertie,
      id_properties,
      id_professional,
      name,
      email,
      phone,
      preference,
      message,
      read: 0,
    })

    return res.send('Contato criado com sucesso')
  } catch (error) {
    return res.status(500).json({ error: `Erro ao criar contato: ${error}` })
  }
})

router.post('/read/:id', verifyJWT, async (req: any, res) => {
  const { id } = req.params

  try {
    const message = await ContactsModel.findOne({ where: { id } })
    const messageParse = parseInfo(message)

    try {
      const user = await UsersModel.findOne({ where: { id: messageParse.id_professional } })

      if (parseInfo(user).id === req.userId) {
        try {
          await ContactsModel.update(
            { read: '1' },
            {
              where: { id },
            },
          )

          return res.json('Contato atualizado com sucesso.')
        } catch (error) {
          return res.status(500).json({ error: `Impossível atualizar este contato: ${error}` })
        }
      }

      return res.status(500).json({ error: 'Este contato não pode ser lido agora.' })
    } catch (error) {
      return res.status(500).json({ error: `Não conseguimos validar seu usuário: ${error}` })
    }
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos buscar seu cadastro: ${error}` })
  }
})

export default router
