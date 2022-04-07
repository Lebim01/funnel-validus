import nextConnect from 'next-connect';
import multer from 'multer';
import connection from '../../mysql/connection'

const newUser = async (name, photo, url, phone, instagram) => {
  try {
    const queryresult = await connection.awaitQuery(`INSERT INTO users SET name = ?, photo = ?, url = ?, phone = ?, instagram = ?`, [name.trim(), photo.trim(), url, phone, instagram]);
    return { ...queryresult[0] }
  } catch (err) {
    console.error(err)
  }
}

const getValidUrl = async (url, sec = 0) => {
  try {
    const user = await getUser(url + `${sec === 0 ? '' : `-${sec}`}`)
    if (user) {
      console.log(user)
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
    filename: (req, file, cb) => cb(null, file.originalname),
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
  const { name, phone, instagram } = req.body
  const urlPhoto = 'photos/' + req.file.originalname

  const _url = name.trim().split(' ').map(word => word.toLowerCase().trim()).join('-')
  const url = await getValidUrl(_url)
  await newUser(name, urlPhoto, url, phone, instagram)
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