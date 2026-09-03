import { Body , Controller , Get , Post } from '@nestjs/common';
import { AuthService } from './auth.service'



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Get()
    info() {
        return this.authService.getInfo()
    }

    @Post('login')
    login(@Body() input:{username:string , password:string} ){
        return this.authService.login(input)
    }


}
