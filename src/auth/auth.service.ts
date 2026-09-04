import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username: string, email: string, password: string }
type AuthInputLogin = { email: string, password: string }
type SingInData = { userId: string, email: string }
type AuthResult = { acessToken: string, userId: string, email: string }


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    getInfo() {
        return { data: 'x', message: 'succes' }
    }

    // ---------------------------------------INREGISTRARE-----------------------------------------------------------------

    async singUp(input: AuthInput): Promise<any> {
        try {
            const userExist = await this.validateUser(input)

            if (userExist) {
                throw new UnauthorizedException()
            }

            const user = await this.usersService.createUser(input);
            return this.Token({
                userId: user._id.toString(),
                email: user.email,
            })

        } catch (err) {
            throw new UnauthorizedException()
        }
    }

    // ---------------------------------------LOGIN-----------------------------------------------------------------

    async login(input: AuthInputLogin): Promise<any> {
        try {
            const user = await this.validateUser(input)

            if (!user) {
                throw new UnauthorizedException()
            }

            return this.Token(user)

        } catch (err) {
            throw new UnauthorizedException()
        }
    }

    // ---------------------------------------VALIDATE USER-----------------------------------------------------------------

    async validateUser(input: AuthInputLogin): Promise<any | null> {

        const user = await this.usersService.findUserByEmail(input.email)

        if (user && user.password === input.password) {
            return {
                userId: user._id.toString(),
                email: user.email
            }
        }

        return null
    }

    // ---------------------------------------JWT TOKEN-----------------------------------------------------------------

    async Token(user: SingInData): Promise<AuthResult> {
        const payload = {
            sub: user.userId,
            email: user.email
        }

        const acessToken = await this.jwtService.signAsync(payload);

        return {
            acessToken: acessToken,
            userId: user.userId,
            email: user.email
        }
    }
}