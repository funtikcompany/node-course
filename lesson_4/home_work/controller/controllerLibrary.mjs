import LibraryModulesModel from '../models/libraryModules.mjs'
class LibraryController {
    static getLibrary(req, res) {
        try {
            const libraryModules = LibraryModulesModel.getAllLibraryModules()
            res.render('library/libraryShelter', { title: 'Library Modules', libraryModules, searchAuthor: '', searchYear: '', currentPath: '/library' })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static getLibraryById(req, res) {
        try {
            const id = req.params.id
            const libraryModule = LibraryModulesModel.getLibraryModuleById(id)
            res.render('library/libraryModuleDetail', { title: 'Library Module', libraryModule, currentPath: '/library' })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static getLibraryForm(req, res) {
        try {
            const id = req.params.id
            let libraryModule = null
            if (id) {
                libraryModule = LibraryModulesModel.getLibraryModuleById(id)
            }
            res.render('library/libraryModuleForm', { title: 'Library Module', libraryModule, currentPath: '/library' })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static createLibrary(req, res) {
        try {
            const { name, author, year } = req.body
            LibraryModulesModel.createLibraryModule(name, author, year)
            res.redirect('/library')
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static updateLibrary(req, res) {
        try {
            const id = req.params.id
            const { name, author, year } = req.body
            LibraryModulesModel.updateLibraryModule(id, name, author, year)
            res.redirect('/library')
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static deleteLibrary(req, res) {
        try {
            const id = req.params.id
            LibraryModulesModel.deleteLibraryModuleById(id)
            res.redirect('/library')
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static searchLibrary(req, res) {
        try {
            const { author, year } = req.query
            const libraryModules = LibraryModulesModel.searchAndFilterLibraryModule(author, year)
            res.render('library/libraryShelter', { title: 'Library Modules', libraryModules, searchAuthor: author || '', searchYear: year || '', currentPath: '/library' })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
}
export default LibraryController