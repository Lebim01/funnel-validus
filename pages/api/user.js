import connection from '../../mysql/connection'

const getUser = async (url) => {
    const queryresult = await connection.awaitQuery(`SELECT * FROM users WHERE url = ?`, [url.trim()]);
    return queryresult.length > 0 ? { ...queryresult[0] } : null
}

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

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/photos/${file.name}`, data);
    //await fs.unlinkSync(file.path);
    return;
};

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const user = await getUser(req.query.pid)
                res.json(user)
            } catch (err) {
                res.json(err);
                res.status(500).end()
            }
            break;
        case 'POST':
            try {
                const form = new formidable.IncomingForm();
                form.parse(req, async function (err, fields, files) {
                    await saveFile(files.file);
                    return res.status(201).send("");
                });

                /*const { name, photo, phone, instagram } = req.body
                const _url = name.trim().split(' ').map(word => word.toLowerCase().trim()).join('-')
                const url = await getValidUrl(_url)
                //const urlPhoto = await writeImage(url, photo)
                await newUser(name, urlPhoto, url, phone, instagram)
                res.json({
                    name,
                    photo: urlPhoto,
                    url
                })*/
            } catch (err) {
                res.json(err);
                res.status(500).end()
            }
            break;
    }
}