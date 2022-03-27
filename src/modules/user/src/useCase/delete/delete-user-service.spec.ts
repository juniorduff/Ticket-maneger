import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infra/repository/user.repository';
import { mockNewUser } from '../../mock/user-mock.util';
import exp from 'constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DeleteUserUseCase } from './delete-user.useCase';
describe('Delete user', () => {
  let deleteUserUseCase: DeleteUserUseCase;
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
        DeleteUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);

    expect(deleteUserUseCase).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a user', async () => {
    mockUserRepository.findById.mockResolvedValue(
      Promise.resolve(mockNewUser()),
    );

    await deleteUserUseCase.execute({
      user_id: '1',
    });
  });

  it('should throw an error if user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(Promise.resolve(null));
    await deleteUserUseCase
      .execute({
        user_id: '1',
      })
      .catch((e) => {
        console.error(e);
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      });
  });
});
