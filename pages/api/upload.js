import nextConnect from 'next-connect';
import multer from 'multer';
import connection from '../../mysql/connection'
import path from 'path'

const newUser = async (name, photo, url, phone, instagram, description, video, lead = 0) => {
  try {
    const queryresult = await connection.awaitQuery(`INSERT INTO users SET name = ?, photo = ?, url = ?, phone = ?, instagram = ?, description = ?, video = ?, is_lead = ?`, [name.trim(), photo.trim(), url, phone, instagram, description, video, Number(lead)]);
    return { ...queryresult[0] }
  } catch (err) {
    console.error(err)
  }
}

const getValidUrl = async (url, sec = 0) => {
  try {
    const user = await getUser(url + `${sec === 0 ? '' : `-${sec}`}`)
    if (user) {
      return getValidUrl(url, sec + 1)
    } else {
      return url + `${sec === 0 ? '' : `-${sec}`}`
    }
  } catch {
    return url
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/photos',
    filename: async (req, file, cb) => {
      const _url = req.body.name.trim().split(' ').map(word => word.toLowerCase().trim()).join('-')
      const url = await getValidUrl(_url)
      cb(null, `${url}${path.extname(file.originalname)}`)
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  const { name, phone, instagram, description, video, lead } = req.body
  const file = req.file
  const _url = name.trim().split(' ').map(word => word.toLowerCase().trim()).join('-')
  const url = await getValidUrl(_url)
  const urlPhoto = '/photos/' + `${url}${path.extname(file.originalname)}`
  await newUser(name, urlPhoto, url, phone, instagram, description, video, lead || 0)
  res.json({
    name,
    photo: urlPhoto,
    url
  })
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};