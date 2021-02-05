import { Controller, Req, Get, Render, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { ChatroomService } from './chatroom.service';

@Controller('chatroom')
export class ChatroomController {
  constructor(private chatroomService: ChatroomService) {}

  //pages///////////////////////////////
  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('chatroom')
  forumPage(@Req() req: any) {
    const user = req.user;
    return {
      user,
      title: 'mini forum',
    };
  }
  //////////////////////////////////////

  //api////////////////////////////////
  @Get('/api')
  @UseGuards(AuthenticatedGuard)
  async fetchAllChatRoom() {
    const chatroom = await this.chatroomService.fetchAllChatRoom();
    return {
      chatroom,
    };
  }
  /////////////////////////////////////
}
