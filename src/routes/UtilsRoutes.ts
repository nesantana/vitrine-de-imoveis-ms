import { Router } from 'express'

const router = Router()

export const purposes = [
  {
    id: 0,
    label: 'Comprar',
  },
  {
    id: 1,
    label: 'Alugar',
  },
  {
    id: 2,
    label: 'Lançamentos',
  },
]

export const type = [
  {
    id: 0,
    label: 'Casa/Sobrado',
  },
  {
    id: 1,
    label: 'Apartamento',
  },
  {
    id: 2,
    label: 'Comercial',
  },
  {
    id: 3,
    label: 'Terreno',
  },
  {
    id: 4,
    label: 'Fazenda',
  },
  {
    id: 5,
    label: 'Chacára',
  },
]

export const states = [
  { name: 'Acre', initials: 'AC' },
  { name: 'Alagoas', initials: 'AL' },
  { name: 'Amapá', initials: 'AP' },
  { name: 'Amazonas', initials: 'AM' },
  { name: 'Bahia', initials: 'BA' },
  { name: 'Ceará', initials: 'CE' },
  { name: 'Distrito Federal', initials: 'DF' },
  { name: 'Espírito Santo', initials: 'ES' },
  { name: 'Goiás', initials: 'GO' },
  { name: 'Maranhão', initials: 'MA' },
  { name: 'Mato Grosso', initials: 'MT' },
  { name: 'Mato Grosso do Sul', initials: 'MS' },
  { name: 'Minas Gerais', initials: 'MG' },
  { name: 'Pará', initials: 'PA' },
  { name: 'Paraíba', initials: 'PB' },
  { name: 'Paraná', initials: 'PR' },
  { name: 'Pernambuco', initials: 'PE' },
  { name: 'Piauí', initials: 'PI' },
  { name: 'Rio de Janeiro', initials: 'RJ' },
  { name: 'Rio Grande do Norte', initials: 'RN' },
  { name: 'Rio Grande do Sul', initials: 'RS' },
  { name: 'Rondônia', initials: 'RO' },
  { name: 'Roraima', initials: 'RR' },
  { name: 'Santa Catarina', initials: 'SC' },
  { name: 'São Paulo', initials: 'SP' },
  { name: 'Sergipe', initials: 'SE' },
  { name: 'Tocantins', initials: 'TO' },
]

router.get('/purposes', async (req, res) => {
  res.send(purposes)
})

router.get('/types', async (req, res) => {
  res.send(type)
})

router.get('/states', async (req, res) => {
  res.send(states)
})

export default router
