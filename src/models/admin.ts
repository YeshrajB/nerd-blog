import { User } from "./user";

export interface AdminUser extends User {
    createdAt: string;
    lastLogin?: string;
    isActive: boolean;
    failedLoginAttempts?: number;
}