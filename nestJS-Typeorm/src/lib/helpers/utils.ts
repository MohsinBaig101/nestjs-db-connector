// pass validateOrReject error to below function, it will auto format the error on nested level.

export function validationErrorMapper(validationErrors: any): any {
    const formattedErrors: any = [];
    return (function AnonymousRecursiveFN(validationErrors: any, arr: any[] = []): any {
        validationErrors?.forEach(error => {
            if ((error?.children || []).length > 0) {
                const push = [...arr, error?.property];
                AnonymousRecursiveFN(error?.children, push);
                return true;
            }
            formattedErrors.push({
                'type': 'Functional',
                'code': '810003',
                message: `${Object.values(error?.constraints)?.[0]}`,
                path: arr.length > 0 ? arr.join('.') + '.' + error?.property : error.property,
            });
            return true;
        });
        return formattedErrors;
    })(validationErrors);
}

export function removeProperties<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const copy = { ...obj }; // Create a shallow copy
    keys.forEach((key) => delete copy[key]);
    return copy;
}