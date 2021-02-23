const fs = require('fs');

class JsonStorage{
    constructor(filePath) {
        this.filePath = filePath;
    }

    nextId() {
        return (JSON.parse(fs.readFileSync(this.filePath))).nextId;
    }

    incrementNextId() {
        const file = JSON.parse(fs.readFileSync(this.filePath));
        file.nextId++;
        fs.writeFileSync(this.filePath, JSON.stringify(file, null, 4, (err) => {
            if (err) throw err;
        }));
    }

    readItems() {
        return (JSON.parse(fs.readFileSync(this.filePath))).items;
    }

    writeItems(items) {
        const file = (JSON.parse(fs.readFileSync(this.filePath)));
        file.items = items;
        fs.writeFileSync(this.filePath, JSON.stringify(file, null, 4), (err) => {
            if(err) throw err;
        });
    }
};

module.exports = JsonStorage;