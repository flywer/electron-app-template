import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class AppSettings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        comment: '应用设置名',
    })
    settingName: string;

    @Column({
        comment: '应用设置值',
    })
    settingValue: string;
}
