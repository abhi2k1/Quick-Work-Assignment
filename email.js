const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET =  process.env.CLIENT_SECRET;
const REDIRECT_URL =  process.env.REDIRECT_URL;
const REFRESH_TOKEN =  process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)

oAuth2Client.setCredentials({
    refresh_token:REFRESH_TOKEN
});

router.post("/sendEmail",async (req,res)=>{
    //console.log(CLIENT_ID,CLIENT_SECRET, REDIRECT_URL,REFRESH_TOKEN);
    //res.send("listening...");
    const {reciverEmail,subject,text}=req.body;
    console.log(reciverEmail,subject,text);

    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'abhishekgupta.ag250@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })

        const mailOptions ={
            from:'Abhishek Gupta <abhishekgupta.ag250@gmail.com>',
            to:reciverEmail,
            subject:subject,
            text:text,



        };

        const result = await  transport.sendMail(mailOptions);
        return res.send(result);
    }catch(err){
        res.send(err);
    }
})
module.exports = router;