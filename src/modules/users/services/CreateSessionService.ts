import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Error(`Incorrect e-mail or password!`);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new Error(`Incorrect e-mail or password!`)
        }

        const token = sign({}, 'ioeofijweofijweofim281319827213rfvwd32134', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { user, token };

    }
}