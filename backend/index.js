
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routers/route.js'
import configViewEngine from './src/config/viewEngine/viewEngine.js'
import sqlConnection from './src/config/db/sqlConnection.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3030'], // Thay đổi thành origin của ứng dụng React của bạn
    optionsSuccessStatus: 200 // Để cho phép trạng thái thành công 200 được trả về
}));
//middleware
app.use(express.json());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// set up views engine
configViewEngine(app);

//connect database
sqlConnection();

//router init
router(app)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})
