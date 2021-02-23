const JsonStorage = require('./jsonStorage');
const fs = require("fs");

class MediaRepository {

    constructor(filePath) {
        this.path = filePath;
        this.storage = new JsonStorage(filePath + ".json");
    }

    getNextId() {
        this.storage.readItems();
        return this.storage.nextId();
    }

    incrementId() {
        const items = this.storage.readItems();
        this.storage.incrementNextId();
        this.storage.writeItems(items);
    }

    supportedFileFormats() {
        return this.storage.readItems();
    }

    getMediaPath(id) {
        for (const item of this.supportedFileFormats()) {
            const fullPath = this.path + '/' + String(id) + '.' + item;
            if (fs.existsSync(fullPath)) {
                return fullPath;
            }
        }
        return null;
    }
};

module.exports = MediaRepository;
    