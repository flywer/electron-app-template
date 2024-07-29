import ErrorCode from "@main/framework/errorHandler/ErrorCode";

/**
 * 全局错误码常量
 **/
export const GlobalErrorCodeConstants = {
    SUCCESS: () => new ErrorCode(200, "成功")
}

export default GlobalErrorCodeConstants;
