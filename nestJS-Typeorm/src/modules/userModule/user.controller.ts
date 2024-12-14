import {
    Body,
    Controller,
    Get,
    ParseFilePipe,
    Param,
    UseFilters,
    UseGuards,
    Post,
    Req,
    Res,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { UserDTO, UserPutDTO } from './user.dto';
import { Express, Response } from 'express';
import { FileSizeValidationPipe } from '../../middleware/fileValidation';
import { AuthGuard } from '../../guards/Authorize';
import { CustomValidationPipe } from '../../pipes/ValidationPipe';
import { CustomExceptionFilter } from '../../exceptions/CustomValidationError';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    public async getUsers(@Req() req: Request, @Res() res: Response): Promise<any> {
        const users = await this.userService.getUsers();
        return res.json(users);
    }

    @Get("/users/posts")
    public async getUserWhoHavePosts(@Req() req: Request, @Res() res: Response): Promise<any> {
        const users = await this.userService.getUsersWhoHavePosts();
        return res.json(users);
    }

    @UseFilters(new CustomExceptionFilter())
    @Post()
    public async insertUser(
        @Body(new CustomValidationPipe()) body: UserDTO,
        @Res() res: Response,
    ) {
        await this.userService.saveUser(body);
        return res.json();
    }

    @UseFilters(new CustomExceptionFilter())
    @Put('/:userId')
    public async updateUser(
        @Body(new CustomValidationPipe()) body: UserPutDTO,
        @Param('userId') userId: string,
        @Res() res: Response,
    ) {
        await this.userService.updateUser(userId, body);
        return res.json();
    }

    @Get('/:userId')
    public async getUser(
        @Param('userId') userId: string,
        // @Res() res: Response,
    ) {
        const userObj = await this.userService.getUser(userId);
        return userObj;
        // return res.json(userObj || {});
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                // Destination storage path details
                destination: (req: any, file: any, cb: any) => {
                    const uploadPath = path.join(process.cwd(), '/public');
                    cb(null, uploadPath);
                },
                // File modification details
                filename: (req: any, file: any, cb: any) => {
                    // Calling the callback passing the random name generated with the original extension name
                    cb(null, `${uuid()}${path.extname(file.originalname)}`);
                },
            }),
        }),
    )
    // @UsePipes(FileSizeValidationPipe)
    public async uploadUser(
        @UploadedFile(
            FileSizeValidationPipe,
            new ParseFilePipe({
                validators: [
                    // FileSizeValidationPipe
                ],
            }),
        )
        file: Express.Multer.File,
        @Body() body,
    ) {
        console.log(body);
    }
}
