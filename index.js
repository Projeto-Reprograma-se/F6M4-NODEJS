const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')

const app = express()
const porta = 443

app.use(session({ secret: '1234567890' }))

app.use(bodyParser.urlencoded({ extended: true }))

const login = 'admin'
const senha = '1234'

app.get('/email', (req, res) => {
  res.render('email');
})

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './'))

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }
})

app.post('/', (req, res) => {
  if (req.body.password == senha && req.body.login == login) {
    req.session.login = login
    res.render('logado')
    console.log('Usuário logado: ' + req.session.login)
  }
  else {
    res.render('home')
  }
})
// Email

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2044f973c6a984", // a434d7f9f8c40a (Minha conta)
    pass: "a4e154605a67ae"  // e6c69af8fed1bd (Minha conta)
  }
});

app.post('/sendemail', async (req, res) => {
  const email = req.body.email;
  //console.log(req.body)
  const message = {
    from: "seu-email@exemplo.com",
    to: email,
    subject: "Prática Semana 4",
    text: "teste",
    html: "<p>HTML do e-mail</p>"
  };

  transport.sendMail(message, function(err) {
    if (err) {
      //console.log(err);
      console.log(err);
      console.log('Erro e-mail não enviado!');
    } else {
      //console.log('E-mail enviado com sucesso!');
      console.log('E-mail enviado com sucesso!');
    }
  })

});

app.listen(porta, () => {
  console.log('Servidor Rodando')
})
