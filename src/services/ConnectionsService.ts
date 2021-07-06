import { getCustomRepository, IsNull } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnection {
    admin_id?: string;
    id?: string;
    user_id?: string;
    socket_id: string;
}

class ConnectionsService {

    constructor(
        private connectionRepository: ConnectionsRepository = getCustomRepository(ConnectionsRepository)
    ) { }

    async create({ admin_id, socket_id, user_id, id }: IConnection): Promise<Connection> {
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionRepository.save(connection)

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = this.connectionRepository.findOne({ user_id });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connection = this.connectionRepository.find({
            where: { admin_id: IsNull() },
            relations: ["user"]
        });
        return connection
    }

    async findBySocketId(socket_id: string) {
        const connection = this.connectionRepository.findOne({ socket_id });

        return connection;
    }

    async updateAdminID(user_id: string, admin_id: string) {
        await this.connectionRepository
            .createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where('user_id = :user_id', {
                user_id,
            })
            .execute();
    }
}

export { ConnectionsService };

