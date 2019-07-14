import db from '~/lib/db'

export default async (req, res) => {
  const { query: { id }} = req
  const [album] = await db('albums').select().where('id', id).limit(1)
  res.json(album)
}