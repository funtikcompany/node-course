import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Ім\'я власника є обов\'язковим'],
        minlength: [2, 'Ім\'я власника повинно бути не менше 2 символів'],
        maxlength: [50, 'Ім\'я власника повинно бути не більше 50 символів'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'Прізвище власника є обов\'язковим'],
        minlength: [2, 'Прізвище власника повинно бути не менше 2 символів'],
        maxlength: [50, 'Прізвище власника повинно бути не більше 50 символів'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Адреса власника є обов\'язковою'],
        minlength: [2, 'Адреса власника повинна бути не менше 2 символів'],
        maxlength: [100, 'Адреса власника повинна бути не більше 100 символів'],
        trim: true,
    },
});

export default mongoose.model('Owner', ownerSchema);