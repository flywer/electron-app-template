import GlobalErrorHandler from "@main/framework/errorHandler/GlobalErrorHandler";

export function Catch() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            try {
                return originalMethod.apply(this, args);
            } catch (error) {
                GlobalErrorHandler.handleError(error);
            }
        };

        return descriptor;
    };
}
