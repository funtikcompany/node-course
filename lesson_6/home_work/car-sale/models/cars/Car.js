import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Назва автомобіля є обов\'язковою'],
        minlength: [2, 'Назва автомобіля повинна бути не менше 2 символів'],
        maxlength: [50, 'Назва автомобіля повинна бути не більше 50 символів'],
        trim: true,
    },
    number: {
        type: String,
        required: [true, 'Номер автомобіля є обов\'язковим'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'Рік випуску автомобіля є обов\'язковим'],
        min: [1940, 'Рік випуску автомобіля повинен бути не менше 1940'],
        max: [new Date().getFullYear(), 'Рік випуску автомобіля повинен бути не більше ' + new Date().getFullYear()],
    },
    image: {
        type: String,
        default: null,
    },
});

export default mongoose.model('Car', carSchema);