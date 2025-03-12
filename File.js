const fs = require("fs/promises");  
const path = require("path");  


async function writeToFile(filePath, content) {  
    await fs.writeFile(filePath, content, "utf-8");  
}  


async function readFromFile(filePath) {  
    return await fs.readFile(filePath, "utf-8");  
}  

async function overwriteFile(filePath, newContent) {  
    await writeToFile(filePath, newContent);  
}  

async function clearFile(filePath) {  
    await writeToFile(filePath, "");  
}  

async function cleanFile(filePath) {  
    const content = await readFromFile(filePath);  
    const cleanedContent = content.replace(/\d/g, "").toLowerCase();  
    await writeToFile(filePath, cleanedContent);  
}  
async function copyFile(source, destination) {  
    await fs.copyFile(source, destination);  
}  
async function createFolder(folderPath) {  
    await fs.mkdir(folderPath, { recursive: true });  
}   
async function deleteFolder(folderPath) {  
    await fs.rm(folderPath, { recursive: true, force: true });  
}  
async function listFiles(directory) {  
    const files = await fs.readdir(directory, { withFileTypes: true });  
    for (const file of files) {  
        if (file.isFile()) {  
            console.log(path.join(directory, file.name));  
        } else if (file.isDirectory() && file.name !== "node_modules") {  
            await listFiles(path.join(directory, file.name));  
        }  
    }  
}  
async function deleteAllExceptImportant(rootDir, keepFolders = ["node_modules", "src"]) {  
    const items = await fs.readdir(rootDir);  
    for (const item of items) {  
        const itemPath = path.join(rootDir, item);  
        if (!keepFolders.includes(item)) {  
            await fs.rm(itemPath, { recursive: true, force: true });  
        }  
    }  
}  