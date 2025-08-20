import { Resend } from 'resend'

const { RESEND_API_KEY, RESEND_CC, RESEND_SENDER, RESEND_TO } = process.env

const resend = new Resend(RESEND_API_KEY!)

export const sendNotification = async (url: string) => {
  const { data, error } = await resend.emails.send({
    from: `That Covid Life <${RESEND_SENDER}>`,
    to: [RESEND_TO!],
    cc: [RESEND_CC!],
    subject: 'New blog draft created',
    html: `<strong>Your blog draft has been created:</strong> <a href="${url}">${url}</a>`,
  })

  if (error) {
    console.error('Error sending notification:', error)
    throw new Error(`Failed to send notification: ${JSON.stringify(error)}`)
  }

  return data
}
