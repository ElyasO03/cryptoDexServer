const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const models = require('./models')
//const authenticate = require('./middlewares/authMiddleware');
require('dotenv').config()

app.use(cors())
//app.use(express.urlencoded())
app.use(express.json())

app.get('/token', (req, res) => {
    const token = jwt.sign({}, 'CryptoDexSuperSecretKey2022')
    res.json({ token: token })
})

app.post('/cryptodex/register', async(req, res) => {
    const {name} = req.body
    const {password} = req.body
    console.log(req.body)
    let salt= await bcrypt.genSalt(10)
    let HashedPassword= await bcrypt.hash(password, salt)
    let user = await models.User.findOne({where: {name:name}})
    if(user) {
        res.json({errorMessage: 'This user already exists please use a different uername or password.'})
    } else {
        const newUser = models.User.build({
            name: name,
            password: HashedPassword
        })
        await newUser.save()
        res.json({success: 'Registered Succesfully :)'})
    }
})

app.post('/cryptodex/login', async (req, res) => {
    const { username, password } = req.body
    let user = await models.User.findOne({ where: { name: username } })
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            const token = jwt.sign({ username: user.name }, process.env.TOKEN_SECRET_KEY)
            res.json({ success: true, token: token, username: user.name })
        } else {
            res.json({ success: false, message: 'Username or password is incorrect.' })
    }
} else{res.json({success: false, message: 'This user Does Not Exist Please register!'})}
})

app.listen(8080, () => {
    console.log('Server is Running...')
})