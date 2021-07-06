import { getCustomRepository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessage {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {

    constructor(
        private messageRepository: MessagesRepository = getCustomRepository(MessagesRepository)
    ) { }

    async create({ admin_id, text, user_id }: IMessage): Promise<Message> {

        const message = this.messageRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messageRepository.save(message);

        return message;
    }

    async listByUser(user_id: string): Promise<Message[]> {

        const list = await this.messageRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list
    }
}

export { MessagesService };

