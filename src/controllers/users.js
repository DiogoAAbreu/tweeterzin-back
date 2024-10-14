import { users } from "../db.js";

export async function signUp(req, res) {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(400).send({ error: 'Preencha todos os campos.' });
    }
    try {
        const userExists = users.find(user => user.username === username);

        if (userExists) {
            return res.status(400).send({ error: 'Este usuario já existe.' })
        }

        users.push({
            username,
            avatar
        });

        return res.status(201).send('OK')
    } catch (err) {
        res.status(500).send({ error: 'Não foi possível salvar seu usuário.' })
    }
}

