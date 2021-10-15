import express, { json } from 'express';
import { db } from '../server';
import { generateOTP, transporter } from './add';
const router = express.Router();

router.post('/regen', async (req, res) => {
  const { admissionNumber, email } = req.body;
  const newOtp = generateOTP();
  let status: 'Successful' | 'Something went wrong';

  try {
    const addRef = db
      .collection('user-details')
      .doc(admissionNumber.toString().toUpperCase());
    await addRef.set({
      OTP: newOtp,
      OTPTime: Date.now(),
    });
    const mailOptions = {
      from: 'vastdiscordbot@gmail.com',
      to: email,
      subject: 'Discord OTP',
      text: `new otp: ${newOtp}`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('email sent');
      }
    });
    status = 'Successful';
    res.json(json);
  } catch (err) {
    console.error(err);
    status = 'Something went wrong';
    res.json(json);
  }
});

export default router;
