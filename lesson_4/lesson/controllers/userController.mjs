class UserController {
    static getUsers(req, res) {
        res.send('respond with a resource')
    }
}
class UserService {
   static getUsers() {
        return 'users'
    }
}

export { UserController, UserService }