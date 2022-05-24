import { Router } from 'express'
import UsersModel from '@models/UsersModel'
import { parseInfo } from '@utils/parseInfo'
import jwt from 'jsonwebtoken'
import { Credentials } from '@utils/constants'
import { verifyJWT } from '@utils/auth'
import { upload } from '@utils/upload'
import moment from 'moment'

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

router.get('/find-me', verifyJWT, async (req: any, res) => {
  try {
    const users = await UsersModel.findOne({ where: { id: req.userId } })

    res.send({ ...parseInfo(users), pendding: req.pendding })
  } catch (error) {
    res.status(500).json({ error: 'Não conseguimos buscar seus dados' })
  }
})

router.get('/find-username', async (req: any, res) => {
  const { username } = req.query
  try {
    const user = await UsersModel.findOne({ where: { username } })

    const userParse = parseInfo(user)

    delete userParse.password
    delete userParse.access
    delete userParse.last_payment
    delete userParse.is_admin
    delete userParse.createdAt
    delete userParse.updatedAt

    res.send(userParse)
  } catch (error) {
    res.status(500).json({ error: 'Não conseguímos validar' })
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
    return res.status(500).json({ error: 'Não conseguimos validar esse usuário agora' })
  }
})

router.post('/create', async (req, res) => {
  const {
    name,
    username,
    email,
    phone,
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

  if (!email) {
    canKeep = false
    message.push('O campo "E-mail" é obrigatório')
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
        phone,
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
    phone,
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

      if (findEmail && parseInfo(findEmail).id !== id) {
        return res.status(500).json({ error: 'E-mail já utilizado na plataforma.' })
      }
    }

    try {
      if (username) {
        const findUsername = await UsersModel.findOne({ where: { username } })

        if (findUsername && parseInfo(findUsername).id !== id) {
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

        if (phone) {
          params.phone = phone
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

router.post('/upload', verifyJWT, upload.single('photo'), async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(500).json({ error: 'Informar o ID do usuário é necessário.' })
  }

  try {
    await UsersModel.update(
      { photo: req.file.filename },
      { where: { id } },
    )

    return res.send('Cadastro atualizado com sucesso.')
  } catch (error) {
    res.status(500).json({ error: `Erro ao tentar atualizar o cadastro: ${error}` })
  }
})

router.get('/due-date', verifyJWT, async (req: any, res) => {
  try {
    const user = await UsersModel.findOne({ where: { id: req.userId } })

    if (Number(parseInfo(user).is_admin)) {
      const users = await UsersModel.findAll()
      const agora = moment().format('L')

      const userParse = parseInfo(users)

      const usersFilter = userParse.filter((u: any) => {
        const myDate = moment(u.last_payment, 'DD/MM/YYYY')
          .add(1, 'month')
          .format('L')

        return myDate < agora
      })

      return res.send(usersFilter)
    }

    return res.status(500).json({ error: 'Usuário não é Administrador.' })
  } catch (error) {
    return res.status(500).json({ error: 'Não conseguímos validar seu usuário' })
  }
})

router.post('/remove-access/:id', verifyJWT, async (req: any, res) => {
  const {
    id,
  } = req.params

  try {
    const user = await UsersModel.findOne({ where: { id: req.userId } })

    if (Number(parseInfo(user).is_admin)) {
      await UsersModel.update(
        { access: '0' },
        {
          where: { id },
        },
      )

      return res.send('Usuário bloqueado com sucesso!')
    }

    return res.status(500).json({ error: 'Usuário não é Administrador.' })
  } catch (error) {
    return res.status(500).json({ error: 'Não conseguímos validar seu usuário' })
  }
})

router.post('/renew-access/:id', verifyJWT, async (req: any, res) => {
  const {
    id,
  } = req.params

  try {
    const user = await UsersModel.findOne({ where: { id: req.userId } })

    if (Number(parseInfo(user).is_admin)) {
      const userToUpdate = await UsersModel.findOne({ where: { id } })

      const newDueDate = moment(parseInfo(userToUpdate).last_payment, 'DD/MM/YYYY').add(1, 'month').format('DD/MM/YYYY')

      await UsersModel.update(
        {
          access: '1',
          last_payment: newDueDate,
        },
        {
          where: { id },
        },
      )

      return res.send('Usuário renovado com sucesso!')
    }

    return res.status(500).json({ error: 'Usuário não é Administrador.' })
  } catch (error) {
    return res.status(500).json({ error: 'Não conseguímos validar seu usuário' })
  }
})

export default router
