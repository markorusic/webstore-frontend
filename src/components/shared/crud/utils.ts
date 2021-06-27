import { PageParams } from '../../../types/dto'
import { ID } from './types'

export const emptyEntityService = {
  fetchPage: async (_: PageParams) => null,
  fetchById: async (_: ID) => null,
  create: async (_: any) => null,
  update: async (_: any) => null
}
