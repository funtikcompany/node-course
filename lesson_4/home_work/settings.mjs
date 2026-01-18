import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filterPath = path.join(__dirname, 'data', 'books.json')
export default {
    dataFilePath: filterPath
}