require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')
const nodemailer = require('nodemailer')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.post('/signature', (req, res) => {
  console.log(req.body.meetingNumber)
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  // console.log(sPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET)
  console.log(signature)

  res.json({
    signature: signature
  })
})

app.post('/creds', (req, res) => {
  res.json({
    sdkKey: process.env.ZOOM_SDK_KEY
  })
})

app.post('/send-email', async (req, res) => {
  console.log("request received")
  const { recipient, subject, message } = req.body;

  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    from: '"Groupstarter 👻" <noreplygroupstarter@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: `<p>Your group member, Matthew Chun, has sent you an invite to join a team meeting on Groupstarter. Head over now!<p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json({
    preview: nodemailer.getTestMessageUrl(info)
  })

})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
