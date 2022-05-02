import { Buffer } from 'buffer'

const newDate = new Date()

const createToken = (id: string | number) => {
  const day = newDate.getUTCDate()
  const month = newDate.getUTCMonth() + 1
  const simpleDate = newDate.getTime()
  const user = id

  const token = `${user}.${day}.${month}.${simpleDate}`

  return Buffer.from(token, 'utf8').toString('base64')
}

const readToken = (authorization: string) => {
  const token = authorization.split(' ')[1] ?? ''

  const tokenSplit = Buffer.from(token, 'base64').toString('utf8').split('.')

  const user = tokenSplit[0]
  const day = tokenSplit[1]
  const month = tokenSplit[2]
  const year = new Date().getFullYear()

  const dateToday = `${newDate.getDate()}/${newDate.getUTCMonth() + 1}/${year}`
  const nextMonthToDateToken = `${day}/${Number(month) + 1}/${year}`

  if (dateToday > nextMonthToDateToken) {
    return {
      auth: false,
      message: 'Necessário fazer login novamente.',
    }
  }

  return {
    auth: true,
    user,
    message: 'Login efetuado com sucesso!',
  }
}

export {
  createToken,
  readToken,
}
