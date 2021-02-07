import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {createMock} from '@golevelup/nestjs-testing';
import {UsersService} from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import {Repository} from 'typeorm';


describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let userRepo: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>()
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    userRepo    = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('validateUser method', () => {
    let result = null

    beforeEach(() => {
    })

    it('should have return error if user not found', () => {

      const spy = jest.spyOn(userService, 'findUserByUsername').mockReturnValue(undefined);

      expect(authService.validateUser({ username: 'foo', password: 'barr' })).rejects.toThrow(Error);
        
      expect(spy).toHaveBeenCalled();
    })


    // it('should have comparePassword method has returned',async () => {

    //   const spy = jest.spyOn(authService, 'comparePassword').mockReturnValue(Promise.resolve(true));

    //   expect(spy).resolves.toEqual(false);
    // })

    it('should have return error if  password  not match', () => {
      
      const user = userRepo.create({
        username: 'foo',
        password:  'bar'
      })
     
      const spyUserService = jest.spyOn(userService, 'findUserByUsername').mockReturnValue(Promise.resolve(user));
      jest.spyOn(authService, 'comparePassword').mockReturnValue(Promise.resolve(false));

      expect(authService.validateUser({ username: 'foo', password: 'barr' })).resolves.toEqual(user);
      
      expect(spyUserService).toHaveBeenCalled();
    })

    it('should have success',() => {

      const user = userRepo.create({
        username: 'foo',
        password:  'bar'
      })
     
      const spyUserService = jest.spyOn(userService, 'findUserByUsername').mockReturnValue(Promise.resolve(user));
      jest.spyOn(authService, 'comparePassword').mockReturnValue(Promise.resolve(true));

      expect(authService.validateUser({ username: 'foo', password: 'barr' })).rejects.toThrow(Error);
      
      
      expect(spyUserService).toHaveBeenCalled();

    })

   })
});
