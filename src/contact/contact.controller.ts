import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';


@Controller('contact')
export class ContactController {

    @Get()
    info(){
        return 'succes'
    }
}
