import {DataSource} from "typeorm";

export const ALiYunSource = new DataSource({
    type: "mysql",
    host: process.env["ALIYUN_HOST"],
    port: 3600,
    username: process.env["ALIYUN_USERNAME"],
    password: process.env["ALIYUN_PWD"],
    database: "electron_app_template",
    synchronize: false,
    logging: true,
})
