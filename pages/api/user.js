import connection from '../../mysql/connection'
import fs from 'fs'

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

const writeImage = (url, photoBase64) => {
    return new Promise((resolve, reject) => {
        const base64Data = photoBase64.split('base64,')[1];

        fs.writeFile(`public/photos/${url}.png`, base64Data, 'base64', function (err) {
            if (err) {
                console.log(err)
                reject()
            } else
                resolve(`/photos/${url}.png`)
        });
    })
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
                const { name, photo, phone, instagram } = req.body
                const _url = name.trim().split(' ').map(word => word.toLowerCase().trim()).join('-')
                const url = await getValidUrl(_url)
                const urlPhoto = await writeImage(url, photo)
                await newUser(name, urlPhoto, url, phone, instagram)
                res.json({
                    name,
                    photo: urlPhoto,
                    url
                })
            } catch (err) {
                res.json(err);
                res.status(500).end()
            }
            break;
    }
}