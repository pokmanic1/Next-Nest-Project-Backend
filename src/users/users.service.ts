import { Injectable } from '@nestjs/common';

export type User={
    userId:number,
    email:string,
    password:string
}

export const users = [
    {
        userId: 1,
        email: "john_doe",
        password: "Password123!"
    },
    {
        userId: 2,
        email: "jane_smith",
        password: "SecurePass456#"
    },
    {
        userId: 3,
        email: "alex_dev",
        password: "CodeMaster789$"
    },
    {
        userId: 4,
        email: "sarah_k",
        password: "MySecretKey321@"
    },
    {
        userId: 5,
        email: "mike_tech",
        password: "TechUser999%"
    }
];

@Injectable()
export class UsersService { 

    async findUserByName(email: string): Promise<User | undefined> {

        return users.find((user) => user.email === email)

    }

}
