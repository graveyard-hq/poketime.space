import userService from './user.service';

class UserController {
    private readonly userService: typeof userService;

    constructor() {
        this.userService = userService;
    }

    handleUserRegistration() {}
}

const userController = new UserController();

export default userController;
