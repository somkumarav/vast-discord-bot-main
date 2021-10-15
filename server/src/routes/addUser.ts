import express from 'express';
import nodemailer from 'nodemailer';
import { db } from '../server';

const router = express.Router();
export interface Status {
  type: 'Ok' | 'Error';
  msg:
    | 'Successful'
    | 'User already exist'
    | 'No such User'
    | 'OTP Generated'
    | 'OTP verified'
    | 'Invalid OTP'
    | 'Time-Out'
    | 'Something went wrong';
}

export const generateOTP = () => {
  const OTPSize = 6;
  let OTP = 0;
  for (let i = 0; i < OTPSize; i++) {
    const random = Math.floor(Math.random() * OTPSize);
    OTP = OTP * 10 + random;
  }
  return OTP;
};
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

router.post('/add', async (req, res) => {
  let status: Status;
  const { admissionNumber, email } = req.body;
  const newOtp = generateOTP();

  try {
    const userAlreadyRef = db
      .collection('user-details')
      .doc(admissionNumber.toString().toUpperCase());
    const userResponse = await userAlreadyRef.get();
    if (userResponse.exists && userResponse.data()?.verified) {
      status = { type: 'Error', msg: 'User already exist' };
      res.json(status);
    } else if (userResponse.exists) {
      console.log('user response');
      const addRef = db
        .collection('user-details')
        .doc(admissionNumber.toString().toUpperCase());
      await addRef.set({
        admissionNumber,
        email,
        OTP: newOtp,
        verified: false,
        OTPTime: Date.now(),
      });
      const mailOptions = {
        from: 'vastdiscordbot@gmail.com',
        to: email,
        subject: 'Discord OTP',
        text: `otp: ${newOtp}`,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log('email sent');
        }
      });
      status = { type: 'Ok', msg: 'Successful' };
      res.json(status);
    } else {
      const addRef = db
        .collection('user-details')
        .doc(admissionNumber.toString().toUpperCase());
      await addRef.set({
        admissionNumber,
        email,
        OTP: newOtp,
        verified: false,
        OTPTime: Date.now(),
      });
      const mailOptions = {
        from: 'vastdiscordbot@gmail.com',
        to: email,
        subject: 'Discord OTP',
        text: `otp: ${newOtp}`,
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log('email sent');
        }
      });

      status = { type: 'Ok', msg: 'Successful' };
      res.json(status);
    }
  } catch (err) {
    status = { type: 'Error', msg: 'Something went wrong' };
  }
});

export default router;
