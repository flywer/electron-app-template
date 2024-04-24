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

    // 唯一标识
    @Column({
        type: "varchar",
        nullable: true
    })
    key: string;

    // 发布时间
    @Column({
        type: "datetime"
    })
    releaseTime: Date;

    // 已读标识
    @Column({
        type: "integer",
        nullable: true,
        default: 0
    })
    readFlag?: number;
}
