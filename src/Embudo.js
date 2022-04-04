import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from './constants'

const Instructor = ({ name, description, photo, phone, instagram, linkedin }) => {
  return (
    <div className='text-center'>
      <img src={photo} className="rounded-full border border-black inline-block aspect-square w-52" />
      <span className='block mt-5 text-xl font-bold'>{name}</span>
      <div>
        {phone &&
          <a className='text-3xl py-2 px-3 rounded-md text-black hover:text-green-500' href={`https://api.whatsapp.com/send?phone=${phone}&text=Hola%2C%20me%20gustar%C3%ADa%20tener%20mas%20informaci%C3%B3n%20para%20tener%20rentabilidad%20con%20mis%20inversiones`} target="_blank">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        }
        {instagram &&
          <a className='text-3xl py-2 px-3 rounded-md text-black hover:text-pink-500' href={instagram} target="_blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
        }
        {linkedin &&
          <a className='text-3xl py-2 px-3 rounded-md text-black hover:text-blue-500' href={linkedin} target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        }
      </div>
      <p className='mt-5 text-sm'>{description}</p>
    </div>
  )
}

const ButtonVIPGroup = ({ phone, text }) => (
  <a
    href={`https://api.whatsapp.com/send?phone=${phone}&text=Hola%2C%20me%20gustar%C3%ADa%20tener%20mas%20informaci%C3%B3n%20para%20tener%20rentabilidad%20con%20mis%20inversiones`}
    className='text-white btn-whatsapp rounded-full px-5 py-3 font-bold flex gap-4 items-center hover:scale-110 hover:bg-green-700 hover:cursor-pointer transition-transform'
  >
    <i className="text-lg fa-brands fa-whatsapp"></i>
    <span>
      {text ? text : 'Contáctate con nosotros'}
    </span>
  </a>
)

const PATTERNS = ['oscar-gastelum']

export default function Custom() {
  const router = useRouter()
  const [whatsapp, setWhatsapp] = useState('526691160038')
  const [user, setUser] = useState(null)
  const [patterns, setPatterns] = useState([])

  const getPatterns = async () => {
    const _patterns = []
    for (const id of PATTERNS) {
      const res = await axios.get(`/api/user?pid=${id}`)
      _patterns.push(res.data)
    }
    setPatterns(_patterns)
  }

  const loadUser = async () => {
    const res = await axios.get(`/api/user?pid=${router.query.pid}`)
    setUser(res.data)
    setWhatsapp(res.data.whatsapp)
  }

  useEffect(() => {
    getPatterns()
  }, [])

  useEffect(() => {
    if (router.query.pid) {
      if (PATTERNS.includes(router.query.pid)) {
        setUser(null)
      } else {
        loadUser()
      }
    }
  }, [router.query.pid])

  const px = "lg:px-52 md:px-40 px-10"
  const selectedPattern = PATTERNS.includes(router.query.pid) ? patterns.find(r => r.url === router.query.pid) : null

  return (
    <div className='w-100 overflow-hidden'>
      <Head>
        <title>{user ? user.name : selectedPattern ? selectedPattern.name : ''}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300&display=swap" rel="stylesheet" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-1H024E39XC`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-1H024E39XC');
          `,
          }}
        />
      </Head>

      <Script src="https://kit.fontawesome.com/e2c8f51d15.js" crossOrigin="anonymous"></Script>

      {/** header */}
      <div className='py-8 px-10 w-full bg-orange-500 flex justify-center'>
        <div className='text-white'>
          <h1 className='font-bold text-center text-3xl px-5'>Entrenamiento GRATIS : Capitalízate en BITCOIN todas las semanas</h1>
          <div className='h-[1px] w-full bg-gray-50 my-10'></div>
          <p className='px-5 text-xl text-center'>Dirigidos a : Empresarios, Emprendedores y Personas interesadas en aprender y aprovechar el crecimiento exponencial en el mercado de los criptoactivos - 📅 Hoy y Mañana</p>
        </div>
      </div>

      {/** body */}
      <div>
        {/** video */}
        <div className='text-right py-10 sm:px-20 overflow-hidden'>
          <div className='inline-block w-[450px] h-[300px] max-w-full'>
            <iframe src="https://player.vimeo.com/video/695886230?h=377aadfb0d&autoplay=1&loop=1" className='w-full h-wull min-w-[450px] aspect-video' frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>

        {/** */}
        <div className={`text-center ${px}`}>
          <div className='my-8 h-[1px] bg-gray-100'></div>
          <h1 className='text-3xl text-blue-500'>Qué aprenderás en esta reunión EXCLUSIVA?</h1>
          <div className='my-8 h-[1px] bg-gray-100'></div>
          <p className='text-justify text-lg'>
            Aprenderas algo que solo el 5% de la población utiliza a su favor, conocerás la esencia de la Inteligencia Financiera y aumentar tus ingresos de una manera automatizada y aún más importante cómo capitalizar en Cripto activos para generar un nivel de vida superior y construir verdaderamente un legado para ti y para los tuyos.
          </p>
          <div className='grid md:grid-cols-2 grid-cols-1 mt-10 gap-y-5'>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />Libertad Financiera vs Seguridad Financiera</div>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />¿Cómo Cuidar mi Dinero y mi Patrimonio?</div>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />Estrategias de Ahorro Porcentual</div>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />Diversificación y Fuentes de Ingreso</div>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />Fondos de Inversión</div>
            <div className='flex items-center text-left gap-2 text-lg'><img src="/assets/check.png" />El Futuro del Dinero</div>
          </div>
        </div>
      </div>

      <div>
        <div className='my-10 py-8 px-10 w-full bg-orange-500 flex justify-center text-3xl font-bold text-white'>
          👇🏼Confirma tu Registro AHORA👇🏼
        </div>
        <div className={`${px} grid lg:grid-cols-2 grid-cols-1 gap-x-10`}>
          <div className='border-gray-200 border p-2 shadow-md'>
            <div className='text-md border-white border-2 bg-gray-100 p-2'>
              <h4 className='font-semibold'>¿DÓNDE, CUÁNDO, CÓMO?</h4>
              <br />
              <span className='block font-bold'>📆 Hoy y Mañana</span>
              <span>
                <img draggable="false" role="img" className="emoji" alt="🕒" src="https://s.w.org/images/core/emoji/13.0.0/svg/1f552.svg" />
                &nbsp;08:00 PM
                Chihuahua Sinaloa
                <br />
                <img draggable="false" role="img" className="emoji" alt="🕒" src="https://s.w.org/images/core/emoji/13.0.0/svg/1f552.svg" />
                &nbsp;09:00 PM
                Col Perú CDMX
                <br />
              </span>
              <span className='block'>📍 En línea, ¡Desde cualquier parte del mundo! </span>
              <br />
              <h4 className='font-semibold'>BENEFICIOS:</h4>
              <span className='block'>⭐️ Acceso GRATUITO a entrenamientos (Registro Previo)</span>
              <span className='block'>⭐️ Acceso EXCLUSIVO a grupo de Telegram</span>
              <br />
              <h4 className='font-semibold'>LINK AL WHATSAPP AQUÍ</h4>
              {whatsapp &&
                <div className={`flex justify-center mt-3`}>
                  <ButtonVIPGroup phone={whatsapp} text="Contáctate" />
                </div>
              }
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <div>
        <div className='my-10 py-8 px-10 w-full bg-orange-500 flex justify-center text-3xl font-bold text-white'>
          Acerca de los Instructores:
        </div>
        <div className={`${px} grid md:${!user ? 'grid-cols-1' : 'grid-cols-2'} grid-cols-1 gap-x-7 gap-y-10`}>
          {user && <Instructor {...user} />}
          {patterns.map(({ phone, ...user }, i) =>
            <Instructor {...user} key={i} />
          )}
        </div>

        {whatsapp &&
          <div className={`${px} flex justify-center mt-10`}>
            <ButtonVIPGroup phone={whatsapp} />
          </div>
        }
      </div>

      <div className='mt-10 py-4 px-10 w-full bg-orange-500 flex justify-center text-sm font-bold text-white'>
        . : Todos los derechos reservados 2022 : .
      </div>
    </div>
  )
}
