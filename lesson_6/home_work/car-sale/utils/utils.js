import fs from 'fs';
import path from 'path';
import { __dirname } from '../settings.mjs';
export function deleteFile(directory, filename) {
    const filePath = path.join(__dirname, directory, filename);
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}