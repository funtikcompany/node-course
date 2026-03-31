import path from 'path' 
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
export const __dirname = path.dirname(__filename) // get the name of the directory
const carsDataFilePath = path.join(__dirname, '/data/carsData.json') // __dirname - project folder, /data/carsData.json

export default {
	carsDataFilePath: carsDataFilePath,
}