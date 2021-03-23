import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requestingUser = this.usersRepository.findById(user_id);

    if (!requestingUser) {
      throw new Error("Requesting User does not exist");
    }

    if (!requestingUser.admin) {
      throw new Error("Requesting User is not an admin");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
