const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const chave = 'cyno';

module.exports = {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });

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
    },

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao fazer logout' });
            }
            res.redirect('/');
        });
    }
};

function generateToken(user) {
    const payload = {
        username: user.username,
        id: user.id
    }
    
    const token = jwt.sign(payload, chave, { expiresIn: '1h' });
    return token;
}
