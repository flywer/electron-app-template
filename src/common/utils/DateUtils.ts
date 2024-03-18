export class DateUtils {

    /**
     * 获取当前时间
     */
    public static getNow(): Date {
        return new Date();
    }

    /**
     * 获取当前时间的“年月日”的字符串表示
     * @param hyphen 返回结果是否使用连接符，例如"2022-01-01"
     **/
    public static getDayString = (hyphen?: true | boolean) => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        if (hyphen) {
            return `${year}-${month}-${day}`
        } else {
            return `${year}${month}${day}`
        }
    }

    /**
     * 获取当前时间的“年-月-日 时:分:秒”的字符串表示
     **/
    public static getCurrentDateTime = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    /**
     * 获取当前时分秒的时间戳值
     **/
    public static getCurrentTimeInSeconds = (): number => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return (hours * 3600) + (minutes * 60) + seconds;
    }

    /**
     * 获取当前日期的“yyyy年mm月dd日 hh时mm分ss秒”的字符串表示
     **/
    public static getCNTimeString = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`;
    }

    public static formatNotificationDate(date: Date): string {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const beforeYesterday = new Date(today);
        beforeYesterday.setDate(beforeYesterday.getDate() - 2);

        // 将输入的日期转化为开始时间
        const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (inputDate.getTime() === today.getTime()) {
            // 如果是今天，返回时分
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        } else if (inputDate.getTime() === yesterday.getTime()) {
            // 如果是昨天，返回'昨天'
            return '昨天';
        } else if (inputDate.getTime() === beforeYesterday.getTime()) {
            // 如果是前天，返回'前天'
            return '前天';
        } else {
            // 否则返回日期，比如'3月15日'
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        }
    }
}
