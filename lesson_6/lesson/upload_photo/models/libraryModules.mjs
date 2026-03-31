import DataFileManager from '../services/DataFileManager.js'
class LibraryModulesModel {

    static getAllLibraryModules() {
        return DataFileManager.loadData()
    }

    static getLibraryModuleById(id) {
        return DataFileManager.getItemById(id)
    }
    static createLibraryModule(name, author, year, photo) {
        console.log(photo)
        return DataFileManager.addItem({
            id:new Date().getTime(),
            name, author, year, photo})
    }
    static updateLibraryModule(id, name, author, year, photo) {
        return DataFileManager.updateItemById(id, { name, author, year, photo })
    }

    static deleteLibraryModuleById(id) {
        return DataFileManager.deleteItemById(id)
    }

    static searchAndFilterLibraryModule(author, year) {
        return DataFileManager.searchAndFilterItemByProperties({ author, year })
    }
}
export default LibraryModulesModel