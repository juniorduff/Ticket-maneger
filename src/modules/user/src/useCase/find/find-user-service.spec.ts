import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infra/repository/user.repository';
import { mockNewUser } from '../../mock/user-mock.util';
import { NotFoundException } from '@nestjs/common';
import { FindUserUseCase } from './find-user.useCase';
describe('Delete user', () => {
  let findUserUseCase: FindUserUseCase;
  let userRepository: UserRepository;

  const mockUserRepository = {
    create: jest.fn().mockResolvedValue(mockNewUser()),
    findOne: jest.fn(),
    findIfAlreadyExistsEmail: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);

    expect(findUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be find a user', async () => {
    mockUserRepository.findById.mockResolvedValue(
      Promise.resolve(mockNewUser()),
    );

    const userFind = await findUserUseCase.execute({
      user_id: '1',
    });

    expect(userFind).toEqual(mockNewUser());
  });

  it('should throw an error if user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(Promise.resolve(null));
    await findUserUseCase
      .execute({
        user_id: '1',
      })
      .catch((e) => {
        console.error(e);
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('user is not found');
      });
  });
});
