import Layout from '~/components/Layout'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useState, useEffect } from 'react'

function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative w-full max-w-xl bg-white p-8">
        { children }
      </div>
    </div>
  )
}

function AlbumModal({ album }) {
  return (
    <Modal>
      <img src={`/static${album.artwork}`} alt={`${album.artist} - ${album.title}`} />
    </Modal>
  )
}

export default withRouter(({ router }) => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    (async () => {
      setAlbums(await fetch('/static/albums.json').then(r => r.json()))
    })()
  }, [])

  console.log(albums)

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl uppercase tracking-tighter font-bold text-gray-900">Headbangstagram</h1>
        <div className="flex flex-wrap -mx-2 -mt-4">
          {
            albums.map(album => (
              <div className="w-1/3 px-2 mt-4">
                <Link href={`/lists/show?showItem=${album.id}`} as="/items/show" shallow>
                  <a>
                    <img src={`/static${album.artwork}`} alt={`${album.artist} - ${album.title}`}/>
                  </a>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
      {router.query.showItem &&
        <AlbumModal album={albums.find(album => album.id == router.query.showItem)} />
      }
    </Layout>
  )
})