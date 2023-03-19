const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
  if (req.method === 'POST') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { name, email, phone, comments } = req.body.data
    const regex = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    // Form validation
    if (!name || name.length > 30 || name.length < 3) {
      res.status(400).end()
    } else if (!email || email.length > 50 || !regex.test(email)) {
      res.status(400).end()
    } else if (phone && phone.length > 16) {
      res.status(400).end()
    } else if (comments && comments.length > 300) {
      res.status(400).end()
    } else {
      const content = {
        to: process.env.CONTACT_EMAIL,
        from: 'no-reply@miketropea.com',
        subject: 'Website Contact Form',
        text: `Name: ${name} \n Email: ${email} \n Phone: ${phone} \n Comments: ${comments}`,
        html: `<strong>Name: </strong>${name}<br><strong>Email: </strong>${email}<br><strong>Phone: </strong>${phone}<br><strong>Comments:</strong> ${comments}`
      }
      try {
        sgMail.send(content)
        res.status(200).send('Message sent successfully')
      } catch (error) {
        res.status(400).end()
      }
    }
  } else {
    res.status(405).end()
  }
}
