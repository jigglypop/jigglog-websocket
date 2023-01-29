import { Request, Response } from "express";
import nodemailer from "nodemailer"


export const mailController = async (req: Request, res: Response) => {
    const { name, email, phone, country, memberId  } = req.body
    console.log(process.env.USERNAME)
    const transporter = nodemailer.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',  // SMTP 서버명
        port: 465,  // SMTP 포트
      auth: { // 이메일을 보낼 계정 데이터 입력
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });
    const emailOptions = { // 옵션값 설정
        from: process.env.USERNAME,
        to: [email, "ydh2244@gmail.com"],
        subject: name + "님이 amg2022를 등록했습니다",
        html: 
        `<h1>name: ${name}</h2>`
        +`<h4 style="color: #1d1d1d;">name: ${name}</h4>`
        +`<h4 style="color: #1d1d1d;">email: ${email}</h4>`
        +`<h4 style="color: #1d1d1d;">phone: ${phone}</h4>`
        +`<h4 style="color: #1d1d1d;">country: ${country}</h4>`
        +`<h4 style="color: #1d1d1d;">memberId: ${memberId}</h4>`,
    };
    transporter.sendMail(emailOptions, function (error, info) {
      if (error) {
        throw error
      } else {
        res.status(200).json({ status: 200, data: info });
    }
    })
};