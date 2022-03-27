import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.useCase';
import { UserRepository } from '../../infra/repository/user.repository';
import { mockNewUser } from '../../mock/user-mock.util';
import exp from 'constants';
import { ConflictException } from '@nestjs/common';

describe('Create user', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;

  const mockUserRepository = {
    create: jest.fn().mockResolvedValue(mockNewUser()),
    findOne: jest.fn(),
    findIfAlreadyExistsEmail: jest.fn(),
    findById: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);

    expect(createUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const user = await createUserUseCase.execute({
      mockNewUser,
    } as any);
    expect(user).toEqual(mockNewUser());
  });

  it('should throw an error when email of user already exists', async () => {
    mockUserRepository.findIfAlreadyExistsEmail.mockReturnValue(
      Promise.resolve(mockNewUser()),
    );
    await createUserUseCase
      .execute({
        mockNewUser,
      } as any)
      .catch((error) => {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email already exists');
      });
  });
});
