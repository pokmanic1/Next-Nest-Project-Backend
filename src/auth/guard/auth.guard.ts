import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request=context.switchToHttp().getRequest();
        const token=request.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException('Tokenul de authorizarew libseste')
        }


        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);

            console.log('---------------------------------------------------------------------------------------')
            console.log('---------------------------------------------------------------------------------------')
            console.log('---------------------------------------------------------------------------------------')
            console.log('----------------------------TOKEN PAYLOAD-------------------------------------')
            console.log('---------------------------------------------------------------------------------------')
            console.log('---------------------------------------------------------------------------------------')
            console.log(tokenPayload)
            
            request.user = {
                userID: tokenPayload.sub,
                email: tokenPayload.email
            }
            return true;


        } catch (err) {
            throw new UnauthorizedException()
        }


    }




}
