import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/nestjs-testing'; 
import { Repository } from 'typeorm'; 
import { ChatroomService } from './chatroom.service';
import { UsersService } from '../users/users.service';
import { Chat } from './entities/chat.entity';
import { ChatRoom } from './entities/chatroom.entity'
import { User } from '../users/entities/user.entity';

describe('ChatroomService', () => {
  let chatroomService: ChatroomService;
  let userService: UsersService;
  let chatRoomRepo: Repository<ChatRoom>;
  let chatRepo: Repository<Chat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatroomService,
        UsersService,
        {
          provide: getRepositoryToken(ChatRoom),
          useValue: createMock<Repository<ChatRoom>>()
        },
        {
          provide: getRepositoryToken(Chat),
          useValue: createMock<Repository<Chat>>()
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>()
        },
      ],
    }).compile();

    chatroomService = module.get<ChatroomService>(ChatroomService);
    userService = module.get<UsersService>(UsersService);
    chatRepo = module.get<Repository<Chat>>(getRepositoryToken(Chat));
    chatRoomRepo = module.get<Repository<ChatRoom>>(getRepositoryToken(ChatRoom));
  });

  it('userService,chatroomService should be defined', () => {
    expect(userService).toBeDefined();
    expect(chatroomService).toBeDefined();
  });
});
