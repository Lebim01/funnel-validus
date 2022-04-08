import connection from '../../mysql/connection'

const getUser = async (url) => {
    const queryresult = await connection.awaitQuery(`SELECT * FROM users WHERE url = ?`, [url.trim()]);
    return queryresult.length > 0 ? { ...queryresult[0] } : null
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
            } catch (err) {
                res.json(err);
                res.status(500).end()
            }
            break;
    }
}