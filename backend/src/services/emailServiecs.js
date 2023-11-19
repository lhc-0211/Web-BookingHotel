require('dotenv').config()
import nodemailer from 'nodemailer'


let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'BookingHotel ChienDz" 👻" <lhc021120@gmail.com>', // sender address
        to: dataSend.Email, // list of receivers
        subject: "Thông tin đặt phòng", // Subject line
        text: "Hello world?", // plain text body
        html:
            `<h3>Xin chào ${dataSend.Ten}</h3>
            <p>Bạn nhận được Email này vì đã đặt phòng online trên BookingHotel</p>
            
            <h2>Thông tin đặt phòng</h2>
            <div><b>Tên người đặt:</b> ${dataSend.Ten}</div>
            <div><b>Số điện thoại:</b> ${dataSend.Phone}</div>
            <div><b>Phòng:</b> ${dataSend.MaPhong}</div>
            <div><b>Giá:</b> ${dataSend.Gia}</div>
            <div><b>Thời gian nhận phòng:</b> ${dataSend.startDate}</div>
            <div><b>Thời gian trả phòng:</b> ${dataSend.endDate}</div>
            
            <h2>Chi tiết đơn đặt</h2>
            <table style="width:100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #ddd;">
                    <th style="text-align: left; padding: 8px;">Mã phòng</th>
                    <th style="text-align: right; padding: 8px;">Số lượng</th>
                    <th style="text-align: right; padding: 8px;">Đơn giá</th>
                    <th style="text-align: right; padding: 8px;">Thành tiền</th>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="text-align: left; padding: 8px;">${dataSend.MaPhong}</td>
                    <td style="text-align: right; padding: 8px;">1</td>
                    <td style="text-align: right; padding: 8px;">${dataSend.Gia}</td>
                    <td style="text-align: right; padding: 8px;">${dataSend.Gia}</td>
                </tr>
                <!-- Add more rows if there are multiple items -->
            </table>
            
            <p style="text-align: right; margin-top: 20px;"><b>Tổng cộng:</b> ${dataSend.Gia}</p>
            
            <p>Nếu thông tin trên chính xác vui lòng click vào đường link để xác nhận và hoàn tất thủ tục đặt phòng</p>
            <div>
                <a href='https://www.facebook.com/profile.php?id=100010297296948'>Click here!</a>
            </div>
            
            <div>Xin chân thành cảm ơn</div>
        `, // html body
    });


    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport


    }

}

module.exports = { sendSimpleEmail }