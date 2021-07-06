import { getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettings {
    chat: boolean;
    username: string;
}

class SettingsService {
    constructor(
        private settingsRepository: SettingsRepository = getCustomRepository(SettingsRepository)
    ) { }

    async create({ chat, username }: ISettings): Promise<Setting> {

        const userAlreadyExists = await this.settingsRepository.findOne({ username });

        if (userAlreadyExists) {
            throw new Error('User already exists!')
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);

        return settings;
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({ username });

        return settings;
    }

    async update(username: string, chat: boolean) {
        const settings = await this.settingsRepository.createQueryBuilder().
            update(Setting)
            .set({ chat })
            .where("username = :username", {
                username
            }).execute();

        return settings;
    }
}

export { SettingsService };

