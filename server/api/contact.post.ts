import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmailUser as string,
      pass: config.gmailAppPassword as string
    }
  })

  const body = await readBody(event)
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({
      statusCode: 400, message: 'All fields are required.'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400, message: 'Invalid email address.'
    })
  }

  try {
    await transporter.sendMail({
      from: `"Balconity Contact Form" <${config.gmailUser}>`,
      to: config.contactEmail as string,
      replyTo: email,
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
          <h2 style="border-bottom: 2px solid #00C16A; padding-bottom: 0.5rem;">
            New Contact Form Submission
          </h2>
          <table style="width:100%; margin-top: 1rem; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; width: 100px;">Name</td>
              <td style="padding: 0.5rem 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600;">Email</td>
              <td style="padding: 0.5rem 0;">
                <a href="mailto:${email}" style="color: #00C16A;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600;">Subject</td>
              <td style="padding: 0.5rem 0;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 1.5rem; background: #edfff6; padding: 1rem 1.25rem; border-radius: 4px;">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">Message</p>
            <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 1.5rem; font-size: 0.75rem; color: #00C16A;">
            Sent via your website contact form.
          </p>
        </div>
      `
    })
  } catch (e) {
    console.error('Nodemailer Error:', e)
    throw createError({
      statusCode: 500, message: e instanceof Error ? e.message : 'Failed to send email. Please try again later.'
    })
  }

  return { success: true }
})
