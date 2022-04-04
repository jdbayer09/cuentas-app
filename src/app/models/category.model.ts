import { User } from "./user.model";

export interface Category {
    id?: number;
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
    user?: User;
    disabled?: boolean;
    created?: Date | string;
    cycles?: any[];
}