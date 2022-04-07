import Head from 'next/head'
import axios from 'axios'
import { useRef } from 'react'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default function Home() {

  const photoRef = useRef(null)

  const register = async (e) => {
    e.preventDefault()
    try {
      const data = Object.fromEntries(new FormData(e.target))
      const photo = await toBase64(photoRef.current.files[0])
      alert(photo)
      const res = await axios.post('/api/user', { ...data, photo })
      //window.location.href = `/${res.data.url}`
    } catch (err) {
      alert(err.toString())
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <Head>
        <title>Add new member</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" autoComplete='off' onSubmit={register}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre completo
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Nombre" autoComplete='off' required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Teléfono con lada
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" name="phone" type="text" placeholder="521234567890" autoComplete='off' required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instagram">
              Link de Instagram
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="instagram" name="instagram" type="text" placeholder="Opcional" autoComplete='off' />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
              Foto
            </label>
            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <input
                  ref={photoRef}
                  className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="photo" name="photo" required />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Registrar
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Victor Alvarez. All rights reserved.
        </p>
      </div>
    </div>
  )
}
