import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler.js';
import { JwtModule,JwtService } from '@nestjs/jwt';

type AuthInput = { email: string, password: string }
type SingInData = { userId: number, email: string }
type AuthResult = { acessToken: string, userId: number, email: string }


@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
                private jwtService:JwtService
    ) { }

    getInfo() {
        return { data: 'x', message: 'succes' }
    }
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // ---------------------------------------INREGISTRARE-----------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------

    async singUp(input:AuthInput):Promise<any>{
        try{
            const user=1;
        }catch(err){
            throw new UnauthorizedException()
        }
    }






    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // ---------------------------------------LOGIN-----------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    async login(input: AuthInput): Promise<any> {
        try {
            const user = await this.validateUser(input)

            if(!user){
                throw new UnauthorizedException()
            }

            return this.singIn(user)

        } catch (err) {
            throw new UnauthorizedException()
        }
    }

    async validateUser(input: AuthInput): Promise<SingInData | null> {

        const user = await this.usersService.findUserByName(input.email)

        if (user && user.password === input.password) {
            return {
                userId: user.userId,
                email: user.email
            }
        }

        return null
    }

    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // ---------------------------------------JWT TOKEN-----------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------
   


    async singIn(user:SingInData):Promise<AuthResult>{
        const payload={
            sub:user.userId,
            email:user.email
        }

        const acessToken=await this.jwtService.signAsync(payload);

        return {
            acessToken:acessToken,
            userId:user.userId,
            email:user.email
        }

    }   





}
