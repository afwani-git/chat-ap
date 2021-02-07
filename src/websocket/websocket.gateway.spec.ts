import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/nestjs-testing';
import { WebsocketGateway } from './websocket.gateway';
import { ChatroomService } from '../chatroom/chatroom.service'; 
import { UsersService } from '../users/users.service';

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;
  let service: ChatroomService 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsocketGateway,
        {
          provide: ChatroomService,
          useValue: createMock<ChatroomService>()
        }
      ],
    }).compile();

    gateway = module.get<WebsocketGateway>(WebsocketGateway);
    service = module.get<ChatroomService>(ChatroomService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
