import { Router } from 'express'
import LibraryController from '../controller/controllerLibrary.mjs'
const router = Router()
router.get('/', LibraryController.getLibrary)    //get all library modules   
router.get('/create', LibraryController.getLibraryForm);
router.get('/search', LibraryController.searchLibrary); //search a library module
router.post('/create', LibraryController.createLibrary); //create a new library module
router.get('/update/:id', LibraryController.getLibraryForm); //get the form to update a library module
router.get('/:id', LibraryController.getLibraryById) //get a library module by id


router.post('/update/:id', LibraryController.updateLibrary); //update a library module

router.post('/delete/:id', LibraryController.deleteLibrary);

export default router