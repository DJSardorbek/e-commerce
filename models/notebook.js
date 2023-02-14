const { uuid } = require('uuidv4');
const fs = require('fs');
const path = require('path');

class NoteBook {
    constructor(title, price, img, descr){
        this.title = title;
        this.price = price;
        this.img = img;
        this.descr = descr;
        this.id = uuid();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            descr: this.descr,
            id : this.id
        };
    }
    async save() {
        const notebooks = await NoteBook.getAll();
        notebooks.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'notebooks.json'),
                JSON.stringify(notebooks),
                (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'notebooks.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        });
    }

    static async getById(id) {
        const notebooks = await this.getAll();
        return notebooks.find(c => c.id === id);
    }

    static async Update(notebook) {
        const notebooks = await this.getAll();
        const idx = notebooks.findIndex(c => c.id === notebook.id);
        notebooks[idx] = notebook;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'notebooks.json'),
                JSON.stringify(notebooks),
                (err) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })
    }
}

module.exports = NoteBook;