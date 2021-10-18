import express from 'express';
import { db } from '../server';
import { generateOTP, Status, transporter } from './addUser';
import renderMail from '../functions/renderMail';
const router = express.Router();

router.post('/regen', async (req, res) => {
  const { admissionNumber, email } = req.body;
  let status: Status;
  const newOtp = generateOTP();

  try {
    const addRef = db
      .collection('user-details')
      .doc(admissionNumber.toString().toUpperCase());
    const verifiedDb = await (await addRef.get()).data()?.verified;
    if (verifiedDb === false) {
      await addRef.set({
        admissionNumber,
        email,
        OTP: newOtp,
        OTPTime: Date.now(),
        verified: false,
      });
      const mailOptions = {
        from: 'VAST Discord <vastdiscordbot@gmail.com>',
        to: email,
        subject: 'Verification',
        html: renderMail(newOtp),
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.error(err);
        }
      });
      status = { type: 'Ok', msg: 'OTP Generated' };
      res.json(status);
    } else {
      status = { type: 'Error', msg: 'User already exist' };
      res.json(status);
    }
  } catch (err) {
    status = { type: 'Error', msg: 'Something went wrong' };
    res.json(status);
  }
});

export default router;
