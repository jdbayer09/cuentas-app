export interface User {
    id?: number;
    firstName?: string;
    secondName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    createdAt?: Date | string;
    categories?: any [];
}