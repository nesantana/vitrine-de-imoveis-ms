import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'))
  },
  filename(req, file, cb) {
    const extensaoArquivo = file.originalname.split('.').pop()

    const novoNomeArquivo = require('crypto')
      .randomBytes(16)
      .toString('hex')

    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  },
})

export const upload = multer({ storage })
