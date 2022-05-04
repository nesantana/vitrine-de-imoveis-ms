import { Router } from 'express'
import UsersModel from '@models/UsersModel'
import { parseInfo } from '@utils/parseInfo'
import jwt from 'jsonwebtoken'
import { Credentials } from '@utils/constants'
import { verifyJWT } from '@utils/auth'

const router = Router()

router.get('/', verifyJWT, async (req, res) => {
  const {
    access,
  } = req.query

  try {
    const users = await UsersModel.findAll(access ? { where: { access } } : {})

    res.send(users)
  } catch (error) {
    res.status(500).json({ error: `Não conseguimos buscar os usuários agora, erro: ${error}` })
  }
})

router.post('/login', async (req, res) => {
  const {
    user,
    password,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!user) {
    canKeep = false
    message.push('O campo "Usuário/E-mail" é obrigatório')
  }

  if (!password) {
    canKeep = false
    message.push('O campo "Senha" é obrigatório')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
  }

  try {
    let userFind: any = null

    userFind = await UsersModel.findOne({ where: { email: user } })

    if (!userFind) {
      userFind = await UsersModel.findOne({ where: { username: user } })
    }

    const userParse = parseInfo(userFind)
    const decodePassword = Buffer.from(userParse.password, 'base64').toString('utf8')

    if (decodePassword !== password) {
      return res.status(500).json({ error: 'Opss, parece que você erro o usuário ou a senha' })
    }
    const token = jwt.sign({ id: userParse.id }, Credentials.secret, {
      expiresIn: '7d',
    })
    return res.json({ auth: true, token })
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos validar esse usuário agora, erro: ${error}` })
  }
})

router.post('/create', async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    confirm_password,
    document,
    zipcode,
    street,
    neighborhood,
    number,
    complement,
    professional_document,
    photo,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!name) {
    canKeep = false
    message.push('O campo "Nome" é obrigatório')
  }

  if (!username) {
    canKeep = false
    message.push('O campo "Nome de Usuário" é obrigatório')
  }

  if (!email) {
    canKeep = false
    message.push('O campo "E-mail" é obrigatório')
  }

  if (!document) {
    canKeep = false
    message.push('O campo "CPF/CNPJ" é obrigatório')
  }

  if (!professional_document) {
    canKeep = false
    message.push('O campo "CRECI" é obrigatório')
  }

  if (!password) {
    canKeep = false
    message.push('O campo "Senha" é obrigatório')
  }

  if (!confirm_password) {
    canKeep = false
    message.push('O campo "Confirmação de Senha" é obrigatório')
  }

  if (confirm_password !== password) {
    canKeep = false
    message.push('Os campos "Senha" e "Confirmação de Senha" precisam ser iguais')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
    return
  }

  try {
    const findEmail = await UsersModel.findOne({ where: { email } })

    if (findEmail) {
      return res.status(500).json({ error: 'E-mail já utilizado na plataforma.' })
    }

    try {
      const params = {
        name,
        username,
        email,
        password: Buffer.from(password, 'utf8').toString('base64'),
        document,
        zipcode,
        street,
        neighborhood,
        number,
        complement,
        professional_document,
        photo,
      }

      await UsersModel.create(params)

      return res.send('Usuário criado com sucesso')
    } catch (error) {
      return res.status(500).json({ error: `Erro ao criar usuário: ${error}` })
    }
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos criar esse usuário agora, erro: ${error}` })
  }
})

router.post('/edit', async (req, res) => {
  const {
    id,
    name,
    username,
    email,
    document,
    zipcode,
    street,
    neighborhood,
    number,
    complement,
    professional_document,
    access,
    last_payment,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!id) {
    canKeep = false
    message.push('O ID é obrigatório')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
    return
  }

  try {
    if (email) {
      const findEmail = await UsersModel.findOne({ where: { email } })

      if (findEmail) {
        return res.status(500).json({ error: 'E-mail já utilizado na plataforma.' })
      }
    }

    try {
      if (username) {
        const findUsername = await UsersModel.findOne({ where: { username } })

        if (findUsername) {
          return res.status(500).json({ error: 'Apelido já utilizado na plataforma.' })
        }
      }

      try {
        const params: any = {}

        if (professional_document) {
          params.professional_document = professional_document
        }

        if (neighborhood) {
          params.neighborhood = neighborhood
        }

        if (complement) {
          params.complement = complement
        }

        if (number) {
          params.number = number
        }

        if (street) {
          params.street = street
        }

        if (name) {
          params.name = name
        }

        if (username) {
          params.username = username
        }

        if (email) {
          params.email = email
        }

        if (document) {
          params.document = document
        }

        if (zipcode) {
          params.zipcode = zipcode
        }

        if (last_payment) {
          params.last_payment = last_payment
        }

        if (access) {
          params.access = access
        }

        await UsersModel.update(
          params,
          {
            where: { id },
          },
        )

        return res.send('Usuário atualizado com sucesso')
      } catch (error) {
        return res.status(500).json({ error: `Erro ao atualizar usuário: ${error}` })
      }
    } catch (error) {
      return res.status(500).json({ error: `Erro ao atualizar usuário: ${error}` })
    }
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos atualizar esse usuário agora, erro: ${error}` })
  }
})

export default router
