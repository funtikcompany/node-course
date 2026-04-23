import mongoose from 'mongoose'
import config from '../../config/default.js';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be at most 50 characters long"],
    },
    password: {
        type: String,
        minlength: [4, "Password must be at least 4 characters long"],
        maxlength: [16, "Password must be at most 16 characters long"],
        required: [true, "Password is required"],
    }
})

userSchema.statics.checkDatabaseExists = async () => {
    const databases = await mongoose.connection.listDatabases();
    return databases.databases.some((db) => db.name === config.dataBaseName);
};

userSchema.statics.checkCollectionExists = async function () {
    if (await this.checkDatabaseExists()) {
        const collections = await mongoose.connection.db.listCollections({ name: "users" }).toArray();
        return collections.length > 0;
    }
    return false;
};
const User = mongoose.model('User', userSchema)
export default User