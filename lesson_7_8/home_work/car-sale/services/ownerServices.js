import Owner from '../models/cars/Owner.js'

class OwnerServices {
    static async getAllOwners() {
        return await Owner.find();
    }
    static async getCarById(id) {
        return await Owner.findById(id);
    }
    static async createOwner(ownerData) {
        const owner = new Owner(ownerData);
        return await owner.save();
    }
    static async updateOwner(id, ownerData) {
        return await Owner.findByIdAndUpdate(id, ownerData, { new: true, runValidators: true });
    }
    static async deleteOwnerById(id) {
        return await Owner.findByIdAndDelete(id);
    }
}
export default OwnerServices;