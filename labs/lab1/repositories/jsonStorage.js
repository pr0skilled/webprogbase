const fs = require('fs');

class JsonStorage{
    constructor(filePath) {
        this.filePath = filePath;
    }

    nextId() {
        // TODO: get next entity id
        return (JSON.parse(fs.readFileSync(this.filePath))).nextId;
    }

    incrementNextId() {
        // TODO: increment next entity id 
        const file = JSON.parse(fs.readFileSync(this.filePath));
        file.nextId++;
        fs.writeFileSync(this.filePath, JSON.stringify(file, null, 4, (err) => {
            if (err) throw err;
        }));
    }

    readItems() {
        // TODO: return all items from JSON file
        /*const a = fs.readFileSync(this.filePath);
        const b = JSON.parse(a);
        const c = b.items;
        return c;*/
        return (JSON.parse(fs.readFileSync(this.filePath))).items;
    }

    writeItems(items) {
        // TODO: write all items to JSON
        const file = (JSON.parse(fs.readFileSync(this.filePath)));
        file.items = items;
        fs.writeFileSync(this.filePath, JSON.stringify(file, null, 4), (err) => {
            if(err) throw err;
        });
    }
};

module.exports = JsonStorage;