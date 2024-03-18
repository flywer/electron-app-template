import "reflect-metadata";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AppNotification {
    @PrimaryGeneratedColumn()
    id: number;

    // 标题
    @Column({
        type: "varchar"
    })
    title: string;

    // 内容
    @Column({
        type: "varchar"
    })
    content: string;

    // 类型
    @Column({
        type: "varchar"
    })
    type: "default" | "info" | "success" | "warning" | "error";

    // 发布时间
    @Column({
        type: "datetime"
    })
    releaseTime: Date;
}
