import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/user')
export class UserController {
    // START View ========================================
    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() res: Response) {
        res.render('index.html', {
            title: 'Template Engine',
            name: name
        });
    };
    // START Cookie ========================================
    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() res: Response) {
        res.cookie('name', name);
        res.send('Cookie berhasil diset!');
    };

    @Get('/get-cookie')
    getCookie(@Req() req: Request): string {
        return req.cookies['name'];

    }

    @Get('/clear-cookie')
    clearCookie(@Res() res: Response) {
        res.clearCookie('name'); 
        res.send('Cookie berhasil dihapus!');
    };

    @Get('/sample-response')
    @Header('Contrent-Type', 'application/json')
    @HttpCode(201)
    sampleResponse(): Record<string, string> {
        return {
            status: 'success',
            message: 'This action returns a sample response',
        };

    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            statusCode: 302,
            url: 'api/user/sample-response',
        };

    }

    @Get('/hello')
    sayHello(
        @Query('first_name') firstName: string,
        @Query('last_name') lastName: string
    ): string {
        return `Hello ${firstName} ${lastName}`;

    }

    @Get('/:id')
    getById(@Param('id') id: string): string {
        return `GET ${id}`;
    }

    @Post()
    post(): string {
        return 'POST';
    }

    @Get("/sample")
    get(): string {
        return 'GET';
    }
}
