import type { Find } from 'payload/database'
import type { PayloadRequest, SanitizedCollectionConfig } from 'payload/types'

import type { PostgresAdapter } from './types'

import { findMany } from './find/findMany'
import { getTableName } from './schema/getTableName'

export const find: Find = async function find(
  this: PostgresAdapter,
  {
    collection,
    limit,
    locale,
    page = 1,
    pagination,
    req = {} as PayloadRequest,
    sort: sortArg,
    where,
  },
) {
  const collectionConfig: SanitizedCollectionConfig = this.payload.collections[collection].config
  const sort = typeof sortArg === 'string' ? sortArg : collectionConfig.defaultSort
  const tableName = getTableName({
    adapter: this,
    config: collectionConfig,
  })

  return findMany({
    adapter: this,
    fields: collectionConfig.fields,
    limit,
    locale,
    page,
    pagination,
    req,
    sort,
    tableName,
    where,
  })
}
