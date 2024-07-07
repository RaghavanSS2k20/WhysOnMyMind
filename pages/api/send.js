// import { Resend } from 'resend';

// const resend = new Resend(process.env.resenderApiKey);

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: process.env.resenderMailId,
//   subject: 'A Eager Mind To look at WhyOnM',
//   html: '<p>Congrats Some one has intrest over whyonM</p>'
// });
import { Resend } from 'resend';

const resend = new Resend(process.env.resenderApiKey);

export default async (req, res) => {
  try {
   

    const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: `${process.env.resenderMailId}`,
        subject: "🎉A Eager Mind To look at WhyOnM",
        html: '<p>Congrats Some one has intrest over whyonM</p>',
        // react: EmailTemplate({ name, email })
    });

    res.status(200).json(data);
  } catch (error) {
    console.log("error", error)
    res.status(400).json(error);
  }
};