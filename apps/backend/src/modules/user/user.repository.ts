import { db } from '../../utils/db';
import { UserBadges } from './user.model';

class UserRepository {
    private readonly db: typeof db;

    constructor() {
        this.db = db;
    }

    async selectUserById(id: string) {
        return await this.db.$queryRaw`
            SELECT id, username, email, password, badges, two_fa_enabled, verified, deleted, created_at, updated_at
            FROM users
            WHERE id = ${id}
        `;
    }

    async selectUserByUsername(username: string) {
        return await this.db.$queryRaw`
            SELECT id, username, email, password, badges, two_fa_enabled, verified, deleted, created_at, updated_at
            FROM users
            WHERE username = ${username}
        `;
    }

    async selectUserByEmail(email: string) {
        return await this.db.$queryRaw`
            SELECT id, username, email, password, badges, two_fa_enabled, verified, deleted, created_at, updated_at
            FROM users
            WHERE email = ${email}
        `;
    }

    async updateUserBirthdayWhereId(userId: string, birthday: Date) {
        return await this.db.$executeRaw`
            UPDATE users
            SET birthday = ${birthday}
            WHERE id = ${userId}
        `;
    }

    async insertUser(
        username: string,
        email: string,
        password: string,
        badges: UserBadges[],
        twoFaEnabled: boolean,
        verified: boolean,
        deleted: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        const badgesJSON = JSON.stringify(badges);

        return await this.db.$executeRaw`
            INSERT INTO users (username, email, password, badges, two_fa_enabled, verified, deleted, created_at, updated_at)
            VALUES (${username}, ${email}, ${password}, ${badgesJSON}, ${twoFaEnabled}, ${verified}, ${deleted}, ${createdAt}, ${updatedAt})
        `;
    }
}

const userRepository = new UserRepository();

export default userRepository;
