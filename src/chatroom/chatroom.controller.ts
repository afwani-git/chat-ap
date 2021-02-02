import { Controller, Get, Render } from '@nestjs/common';

@Controller('chatroom')
export class ChatroomController {


  @Get()
  @Render('index')
  index(){
    return {
      title: "hello world"
    }
  }

}
