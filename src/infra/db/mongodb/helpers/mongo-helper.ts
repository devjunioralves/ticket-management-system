import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect() {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
}
