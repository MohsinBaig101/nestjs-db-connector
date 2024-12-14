// import { Express } from "express";
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { UserSignup } from "./DTO/userSignup.dto";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    public async signUp(
        @Body() body: UserSignup,
    ) {
        await this.authService.signUp(body);
        return {
            isSucess: true,
        };
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    public async signIn(
        @Body() body: { email: string, password: string }
    ) {
        const data = await this.authService.signIn(body);
        return data;
    }
}