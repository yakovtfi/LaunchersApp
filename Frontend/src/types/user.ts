export type UserType = 'intel' | 'air_force' | 'admin' | 'user';

export interface User {
    _id?: string;
    username: string;
    password?: string;
    email: string;
    type_user: UserType;
    last_login?: string;
}