import Layout from '~/components/Layout'
import Link from 'next/link'
import Router from 'next/router'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'

function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-25" onClick={() => Router.back()}></div>
      <div className="relative w-full max-w-2xl bg-white p-8">
        { children }
      </div>
    </div>
  )
}

function AlbumModal({ album }) {
  return (
    <Modal>
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
    </Modal>
  )
}

const Index = withRouter(({ router, albums }) => {

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-center text-3xl uppercase tracking-tighter font-bold text-gray-900">💀 Headbangstagram 💀</h1>
        <div className="flex flex-wrap -mx-2 -mt-2">
          {
            albums.map(album => (
              <div key={album.id} className="w-1/3 px-2 mt-4">
                <Link href={`/?showAlbum=${album.id}`} as={`/albums/${album.id}`} scroll={false} shallow>
                  <a>
                    <img src={`/static${album.artwork}`} alt={`${album.artist} - ${album.title}`}/>
                  </a>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      {router.query.showAlbum &&
        <AlbumModal album={albums.find(album => album.id == router.query.showAlbum)} />
      }
    </Layout>
  )
})

Index.getInitialProps = async ({ req, query }) => {
  function getBaseUrl(req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers['x-forwarded-host'] || req.headers.host
    return `${protocol}://${host}/api`
  }

  const baseUrl = req ? getBaseUrl(req) : '/api'
  const albums = await fetch(`${baseUrl}/albums`).then(r => r.json())

  return {
    albums,
  }
}

export default Index