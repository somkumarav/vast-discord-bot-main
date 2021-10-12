import express from 'express';
import { db } from '../server';
const router = express.Router();

let status:
  | 'No such User'
  | 'Invalid OTP'
  | 'OTP verified'
  | 'Unsuccessful'
  | 'Time-Out'
  | 'Something went wrong';

router.post('/verify', async (req, res) => {
  const { admissionNumber, otp } = req.body;
  const userRef = db
    .collection('user-details')
    .doc(admissionNumber.toString().toUpperCase());
  const doc = await userRef.get();
  const otpExpiryTime = parseInt(doc.data()?.OTPTime);

  console.log(otpExpiryTime + 1000 * 60 * 30 - Date.now());

  if (!doc.exists) {
    status = 'No such User';
    res.json(status);
  } else {
    const dbOTP = doc.data()?.OTP;
    try {
      if (otpExpiryTime + 1000 * 60 * 3 >= Date.now()) {
        if (dbOTP === otp) {
          status = 'OTP verified';
          res.json(status);
        } else if (dbOTP !== otp) {
          status = 'Invalid OTP';
          res.json(status);
        }
      } else {
        status = 'Time-Out';
        res.json(status);
      }
    } catch (err) {
      console.error(err);
      status = 'Something went wrong';
      res.json(status);
    }
  }
});

export default router;
