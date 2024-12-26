import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http';


describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports:[],
      providers:[]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', () => {
    const respone = controller.sayHello('Agung', 'Aldi');
    expect(respone).toBe('Hello Agung Aldi');
  });

  it('should can can get view', async () => {
    const respone = httpMocks.createResponse();
    controller.viewHello('Agung', respone);

    expect(respone._getRenderView()).toBe('index.html');
    expect(respone._getRenderData()).toStrictEqual({
      title: 'Template Engine',
      name: 'Agung'
    });
  });
});
