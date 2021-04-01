import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAlreadyExists = this.usersRepository.findById(user_id);

    if (!userAlreadyExists.admin) {
      throw new Error("You don't have admin permission!");
    }

    if (!userAlreadyExists) {
      throw new Error("User is not registered!");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
