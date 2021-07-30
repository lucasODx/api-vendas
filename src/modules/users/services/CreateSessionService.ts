import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new Error(`Passwords don't match!`)
        }

        return user;
    }
}