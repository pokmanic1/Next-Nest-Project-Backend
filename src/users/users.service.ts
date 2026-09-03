import { Injectable } from '@nestjs/common';

export type User={
    userId:number,
    username:string,
    password:string
}

export const users = [
    {
        userId: 1,
        username: "john_doe",
        password: "Password123!"
    },
    {
        userId: 2,
        username: "jane_smith",
        password: "SecurePass456#"
    },
    {
        userId: 3,
        username: "alex_dev",
        password: "CodeMaster789$"
    },
    {
        userId: 4,
        username: "sarah_k",
        password: "MySecretKey321@"
    },
    {
        userId: 5,
        username: "mike_tech",
        password: "TechUser999%"
    }
];

@Injectable()
export class UsersService { 

    async findUserByName(username: string): Promise<User | undefined> {

        return users.find((user) => user.username === username)

    }

}
