const DataBase = require("../database/schema");
const { connection_database_status } = require("../database/connection");

class cropImage_image extends DataBase {

    async show(req, res) {
        try {
            if (connection_database_status != false) {

                let data_for_front = [];
                let select_all_store_image = await this.models.cropImage.findAll();

                for (let index = 0; index < select_all_store_image.length; index++) {
                    data_for_front.push(select_all_store_image[index].dataValues)

                }

                res.json({
                    status: true,
                    body: data_for_front
                });



            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async add(req, res) {
        try {
            if (connection_database_status != false) {
                console.log(req.file);
                console.log(req.files);
                if (!req.file) {


                    res.json({
                        status: false,
                        message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                    });


                } else {


                    let insert_store_image = await this.models.cropImage.create({
                        image: req.file.filename
                    });


                    if (insert_store_image != null && insert_store_image.dataValues.id) {
                        res.json({
                            status: true,
                            message: "عملیات ذخیره عکس  با موفقیت ثبت شد"
                        });
                    } else {
                        res.json({
                            status: false,
                            message: "درعملیات ذخیره عکس  با خطا مواجه شد لطفا دوباره تلاش کنید"
                        });
                    }

                }


            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }


    async delete(req, res) {
        try {
            if (connection_database_status != false) {

                let select_store_image = await this.models.cropImage.findOne({ where: { id: req.params.id } });

                if (select_store_image != null) {

                    let delete_store_image = await this.models.cropImage.destroy({ where: { id: req.params.id } });

                    res.json({
                        status: true,
                        message: "عملیات حدف عکس  با موفقیت انجام شد"
                    });


                } else {
                    res.json({
                        status: false,
                        message: "چنین عکس  در سایت موجود نیست"
                    });
                }


            } else {
                throw new Error('خطا در اتصال به پایگاه داده');
            }
        } catch (error) {
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }
}

module.exports = new cropImage_image();