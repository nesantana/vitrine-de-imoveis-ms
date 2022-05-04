import { Router } from 'express'
import PropertiesModel from '@models/PropertiesModel'
import { verifyJWT } from '@utils/auth'
import Sequelize from 'sequelize'

const router = Router()

router.get('/', verifyJWT, async (req: any, res) => {
  const {
    term,
    purpose,
    bathrooms,
    bedrooms,
    area,
    characteristics,
  } = req.query

  try {
    let where: any = {}
    if (term) {
      where = {
        [Sequelize.Op.or]: [
          {
            title: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('title')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            value: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('value')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            purpose: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('purpose')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            area: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('area')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            area_build: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('area_build')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            address: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('address')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            informations: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('informations')),
              'LIKE',
              `%${term}%`,
            ),
          },
          {
            characteristics: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('characteristics')),
              'LIKE',
              `%${term}%`,
            ),
          },
        ],
      }
    }

    if (purpose) {
      where.purpose = purpose
    }

    if (bathrooms) {
      where.bathrooms = { [Sequelize.Op.between]: bathrooms }
    }

    if (bedrooms) {
      where.bedrooms = { [Sequelize.Op.between]: bedrooms }
    }

    if (area) {
      where.area = { [Sequelize.Op.between]: area }
    }

    if (area) {
      where.area = { [Sequelize.Op.between]: area }
    }

    if (characteristics) {
      where = {
        ...where,
        characteristics: {
          [Sequelize.Op.regexp]: `(${characteristics})`,
        },
      }
    }

    const properties = await PropertiesModel.findAll({ where })

    res.send(properties)
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos buscar as informações agora: ${error}` })
  }
})

router.post('/create', verifyJWT, async (req: any, res) => {
  const {
    value,
    purpose,
    title,
    area,
    area_build,
    bedrooms,
    bathrooms,
    address,
    embed_address,
  } = req.body

  let canKeep: boolean = true
  const message: string[] = []

  if (!value) {
    canKeep = false
    message.push('O campo "Valor" é obrigatório')
  }

  if (!purpose) {
    canKeep = false
    message.push('O campo "Finalidade" é obrigatório')
  }

  if (!title) {
    canKeep = false
    message.push('O campo "Título" é obrigatório')
  }

  if (!area) {
    canKeep = false
    message.push('O campo "Área Total" é obrigatório')
  }

  if (!area_build) {
    canKeep = false
    message.push('O campo "Área Total Constrída" é obrigatório')
  }

  if (!bedrooms) {
    canKeep = false
    message.push('O campo "Quartos" é obrigatório')
  }

  if (!bathrooms) {
    canKeep = false
    message.push('O campo "Banheiros" é obrigatório')
  }

  if (!address && !embed_address) {
    canKeep = false
    message.push('Pelo menos um dos campos de endereço são obrigatórios')
  }

  if (!canKeep) {
    res.status(422).json({
      error: message,
    })
    return
  }

  try {
    const params = {
      ...req.body,
      id_professional: req.userId,
    }

    const newProperty = await PropertiesModel.create(params)

    return res.send(newProperty)
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos criar esse imóvel agora, erro: ${error}` })
  }
})

export default router
