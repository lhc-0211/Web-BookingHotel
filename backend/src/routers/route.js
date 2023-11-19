
import siteRouter from './site'
import companyRouter from './company'
import guestRouter from './guest'
import hotelRouter from './hotel'
import adminRouter from './admin'



function route(app) {
    app.use('/', siteRouter);
    app.use('/company', companyRouter);
    app.use('/guest', guestRouter);
    app.use('/hotel', hotelRouter);
    app.use('/admin', adminRouter);


}

export default route;;
