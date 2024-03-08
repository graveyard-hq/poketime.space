import userRepository from './user.repository';

class UserService {
    private readonly userRepository: typeof userRepository;

    constructor() {
        this.userRepository = userRepository;
    }

    async createUser() {}

    async markUserAsDeleted() {}
}

const userService = new UserService();

export default userService;
