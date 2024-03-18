export class StringUtils {

    /**
     * 判断字符串是否存在乱码
     **/
    public static isMessyCode(str: string): boolean {
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            // ASCII中的规则字符在32-126的范围内
            // 128-255是带有特殊字符的扩展ASCII
            // 65281-65519是unicode全宽字符
            // 1996-40869是中日韩统一象形文字（通用汉字）
            if (!(charCode >= 32 && charCode <= 126) && !(charCode >= 128 && charCode <= 255) && !(charCode >= 65281 && charCode <= 65519) && !(charCode >= 19968 && charCode <= 40869)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 路径分隔符
     **/
    public static joinPaths(...parts: string[]): string {
        return parts.join('/');
    }
}
