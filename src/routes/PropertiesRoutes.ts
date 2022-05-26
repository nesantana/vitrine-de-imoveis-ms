import { Router } from 'express'
import PropertiesModel from '@models/PropertiesModel'
import { verifyJWT } from '@utils/auth'
import Sequelize from 'sequelize'
import { upload } from '@utils/upload'
import { parseInfo } from '@utils/parseInfo'
import CharacteristicsModel from '@models/CharacteristicsModel'

const router = Router()

router.get('/', async (req: any, res) => {
  const {
    term,
    purpose,
    bathrooms,
    bedrooms,
    area,
    area_build,
    characteristics,
    address,
    type,
    id_professional,
    page = 0,
    home,
  } = req.query

  const limit = 9
  let offset = 0

  if (page) {
    offset = page * limit
  }

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

    if (address) {
      const addressWhere = {
        [Sequelize.Op.or]: [
          {
            title: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('address')),
              'LIKE',
              `%${address}%`,
            ),
          },
        ],
      }

      where = {
        ...where,
        ...addressWhere,
      }
    }

    if (purpose) {
      where.purpose = purpose
    }

    if (type) {
      where.type = type
    }

    if (id_professional) {
      where.id_professional = id_professional
    }

    if (bathrooms) {
      where.bathrooms = { [Sequelize.Op.between]: bathrooms.split(',') }
    }

    if (bedrooms) {
      where.bedrooms = { [Sequelize.Op.between]: bedrooms.split(',') }
    }

    if (area) {
      const areaParam = area.split(',').map((a: string) => {
        if (a.length === 1) {
          return `00${a}`
        }

        if (a.length === 2) {
          return `0${a}`
        }

        return a
      })
      where.area = { [Sequelize.Op.between]: areaParam }
    }

    if (area_build) {
      const areaBuildParam = area_build.split(',').map((a: string) => {
        if (a.length === 1) {
          return `00${a}`
        }

        if (a.length === 2) {
          return `0${a}`
        }

        return a
      })
      where.area_build = { [Sequelize.Op.between]: areaBuildParam }
    }

    if (characteristics) {
      where = {
        ...where,
        characteristics: {
          [Sequelize.Op.regexp]: `(${characteristics})`,
        },
      }
    }

    const order: any = [['updatedAt', 'DESC']]

    const properties = await PropertiesModel.findAll({
      where, limit: home ? 6 : limit, offset, order,
    })

    const propertiesParse = parseInfo(properties)
    let propertiesParseArray: any = []

    const chars = await CharacteristicsModel.findAll()
    const allChars = parseInfo(chars)

    propertiesParseArray = propertiesParse.map((property: any) => {
      const charArray = property?.characteristics ? property?.characteristics.split(',') ?? [] : []
      let charArraySend: any = []

      charArraySend = charArray.map((char: string) => {
        const findValueChar = allChars.find(({ id } : any) => Number(char) === id)

        return findValueChar.value
      })

      return {
        ...property,
        characteristics: charArraySend,
      }
    })

    res.send(propertiesParseArray)
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos buscar as informações agora: ${error}` })
  }
})

router.get('/:id', async (req: any, res) => {
  const {
    id,
  } = req.params

  try {
    const property = await PropertiesModel.findOne({ where: { id } })

    const propertyParse = parseInfo(property)

    const chars = await CharacteristicsModel.findAll()
    const allChars = parseInfo(chars)

    const charArray = propertyParse?.characteristics ? propertyParse?.characteristics.split(',') ?? [] : []
    let charArraySend: any = []

    charArraySend = charArray.map((char: string) => {
      const findValueChar = allChars.find((charItem : any) => Number(char) === charItem.id)

      return findValueChar.value
    })

    res.send(
      {
        ...propertyParse,
        characteristics: charArraySend,
      },
    )
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
    type,
    area_build,
    bedrooms,
    bathrooms,
    address,
    coordinates,
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

  if (!type) {
    canKeep = false
    message.push('O campo "Tipo" é obrigatório')
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

  if (!address) {
    canKeep = false
    message.push('O campo "Endereço" é obrigatório')
  }

  if (!coordinates) {
    canKeep = false
    message.push('É necessário selecionar um endereço corretamente')
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

router.post('/update/:id', verifyJWT, async (req: any, res) => {
  const {
    value,
    purpose,
    title,
    type,
    area,
    area_build,
    characteristics,
    bedrooms,
    informations,
    bathrooms,
    suite,
    iptu,
    address,
    coordinates,
    youtube,
  } = req.body

  const {
    id,
  } = req.params

  try {
    const params: any = {
      id_professional: req.userId,
    }

    if (value) {
      params.value = value
    }

    if (purpose) {
      params.purpose = purpose
    }

    if (type) {
      params.type = type
    }

    if (title) {
      params.title = title
    }

    if (informations) {
      params.informations = informations
    }

    if (area) {
      params.area = area
    }

    if (area_build) {
      params.area_build = area_build
    }

    if (bedrooms) {
      params.bedrooms = bedrooms
    }

    if (characteristics) {
      params.characteristics = characteristics
    }

    if (bathrooms) {
      params.bathrooms = bathrooms
    }

    if (address) {
      params.address = address
    }

    if (coordinates) {
      params.coordinates = coordinates
    }

    if (youtube) {
      params.youtube = youtube
    }

    if (iptu) {
      params.iptu = iptu
    }

    if (suite) {
      params.suite = suite
    }

    await PropertiesModel.update(
      {
        ...params,
      },
      { where: { id } },
    )

    return res.send('Imóvel atualizado com sucesso.')
  } catch (error) {
    return res.status(500).json({ error: `Não conseguimos atualizar esse imóvel agora, erro: ${error}` })
  }
})

const createStringWithFilesname = (files: any) => {
  let text = ''

  files.map((file: any, index: any) => {
    text = `${index === 0 ? '' : `${text},`}${file.filename}`
    return file
  })

  return text
}

router.post('/upload', upload.array('photos', 10), async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(500).json({ error: 'Informar o ID do Imóvel é necessário.' })
  }

  try {
    let photos = ''

    if (req.files) {
      const property: any = await PropertiesModel.findOne({ where: { id } })

      if (parseInfo(property).photos) {
        photos = `${parseInfo(property.photos)},${createStringWithFilesname(req.files)}`
      } else {
        photos = createStringWithFilesname(req.files)
      }
    } else {
      return res.send('Imóvel atualizado com sucesso.')
    }

    await PropertiesModel.update(
      { photos },
      { where: { id } },
    )

    return res.send('Imóvel atualizado com sucesso.')
  } catch (error) {
    res.status(500).json({ error: `Erro ao tentar atualizar o imóvel: ${error}` })
  }
})

export default router
