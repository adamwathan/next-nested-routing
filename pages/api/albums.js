import db from '~/lib/db'

export default async (req, res) => {
  res.json(await db('albums').select())
}