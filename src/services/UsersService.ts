import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
    constructor(
        private userRepository: UsersRepository = getCustomRepository(UsersRepository)
    ) { }

    async create(email: string): Promise<User> {

        const userAlreadyExists = await this.userRepository.findOne({ email })

        if (userAlreadyExists) {
            return userAlreadyExists;
        }

        const user = this.userRepository.create({ email })

        await this.userRepository.save(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });

        return user;
    }
}

export { UsersService };

