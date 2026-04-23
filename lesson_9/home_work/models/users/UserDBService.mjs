import MongooseCRUDManager from "../MongooseCRUDManager.mjs";
import User from "./User.mjs";

class UsersDBService extends MongooseCRUDManager {
    async getList(filter) {
        try {
            const res = await super.getList(filter);
            return res;
        } catch (error) {
            return error.message;
        }
    }
}
export default new UsersDBService(User);