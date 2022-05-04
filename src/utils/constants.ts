export const Constants = {
  orders: {
    status: {
      opened: 0,
      inProgress: 1,
      canceled: 2,
      done: 3,
    },
  },
  prices: {
    toNormal: 7,
    toClose: 10,
    toKM: 2.3,
    toSmallUrgency: 5,
    toMediumUrgency: 10,
    toBigUrgency: 15,
  },
  KMs: {
    close: 4,
    far: 7,
  },
}

export const Credentials = {
  db: {
    user: 'levvei01',
    db: 'levvei01',
    password: 'PFKJZ3yxY5CLvAg',
    host: 'mysql.levvei.com',
    dialect: 'mysql',
  },
  email: {
    user: 'levvei.delivery@gmail.com',
    pass: 'new@levvei.gmail',
  },
  secret: 'dml0cmluZWRlaW1vdmVpcy5jb20uYnI=',
}
