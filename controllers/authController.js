const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const chave = 'cyno';

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await db.User.findOne({ where: { username } });

            if (!user) {
                return res.status(401).json({ error: 'Usuário não existe' });
            }

            const senhaCorreta = await bcrypt.compare(password, user.password);
            if (!senhaCorreta) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            const token = generateToken(user);
            res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    
    const token = jwt.sign(payload, chave, { expiresIn: '1h' });
    return token;
}
