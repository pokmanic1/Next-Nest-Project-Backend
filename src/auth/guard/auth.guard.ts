import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest()

        console.log("----------------------------------------------------------------")
        console.log("----------------------------------------------------------------")
        console.log("----------------------------REQUEST_____------------------------")
        console.log("----------------------------REQUEST_____------------------------")
        console.log("----------------------------REQUEST_____------------------------")
        console.log(request)
        console.log("----------------------------REQUEST Method And Url_____------------------------")
        console.log("----------------------------REQUEST Method And Url_____------------------------")
        console.log("----------------------------REQUEST Method And Url_____------------------------")
        console.log(request.method, request.url);
        console.log("----------------------------REQUEST Headers_____------------------------")
        console.log("----------------------------REQUEST Headers_____------------------------")
        console.log("----------------------------REQUEST Headers_____------------------------")
        console.log(request.headers);

        
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException('Tokenul de authorizarew libseste')
        }


        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
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
