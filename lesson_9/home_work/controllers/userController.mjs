import UsersDBService from '../models/users/UserDBService.mjs'
import UserSanitizer from '../validation/user/userSanitize.mjs'
class UserController {
    static async usersList(req, res) {
        try {
            const dataList = await UsersDBService.getList()
            res.render('usersList', {
                users: dataList
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
    static async registerForm(req, res) {
        const dataList = await UsersDBService.getList()
        console.log(dataList)
        res.render('register')
    }
    static async login(req, res) {
        if(req.validationErrors) {
            return res.status(400).render('register', {
                validationErrors: req.validationErrors,
                name: String(req.body?.name ?? '')
            })
        }
        try {
            const sanitizedData = UserSanitizer(req.body)
            const { name } = sanitizedData
            await UsersDBService.create(sanitizedData)
            req.session.username = name
            req.session.sort = { count: -1 }
            res.redirect('/products')
        } catch (err) {
            res.status(500).send(err.message)
        }
    }


    static async deleteUser(req, res) {
        try {
            await UsersDBService.deleteById(req.body.id)
            res.json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to delete user' })
        }
    }
}
export default UserController