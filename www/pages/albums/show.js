import Layout from '~/components/Layout'
import fetch from 'isomorphic-unfetch'

function Show({ album }) {
  return (
    <Layout>
      <div className="p-8">
        <div className="flex -mx-4">
          <div className="w-1/2 px-4">
            <div className="text-2xl font-bold leading-none">{album.title}</div>
            <div className="mt-2 text-sm font-bold leading-none uppercase tracking-wide text-gray-600">
              by <span className="text-gray-700">{album.artist}</span>
            </div>
            <ol className="mt-4 list-decimal text-sm text-gray-800 pl-4">
              {
                album.tracks.map(track => (
                  <li>
                    <div className="flex justify-between">
                      {track.title} <span className="text-gray-600">{track.length}</span>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>
          <div className="w-1/2 px-4">
            <img src={`/static${album.artwork}`} alt={`${album.artist} - ${album.title}`} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

Show.getInitialProps = async ({ req, query }) => {
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const baseUrl = `${protocol}://${host}/api`
  const albums = await fetch(`${baseUrl}/albums`).then(r => r.json())

  return {
    album: albums.find(album => album.id == query.id)
  }
}

export default Show

