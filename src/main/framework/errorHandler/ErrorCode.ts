/**
 * 错误码
 **/
export default class ErrorCode {

    /**
     * 错误码
     */
    private code: Number

    /**
     * 错误提示
     */
    private msg: string

    constructor(code: Number, message: string) {
        this.code = code;
        this.msg = message;
    }
}
