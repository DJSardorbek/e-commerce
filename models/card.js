const { uuid } = require('uuidv4');
const fs = require('fs');
const path = require('path');

const pathToDb = path.join(path.dirname(process.mainModule.filename), 'data', 'card.json');

class Card {
    constructor(){}
    
    static async add(notebook) {
        const card = await Card.fetch();
        
        const idx = card.notebooks.findIndex((c) => c.id === notebook.id);
        const candidate = card.notebooks[idx];

        if(candidate) {
            candidate.count++;
            card.notebooks[idx] = candidate;
        } else {
            notebook.count = 1;
            card.notebooks.push(notebook);
        }
        card.price += +notebook.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve()
                }
            });
        });
    }

    static async fetch(){
        return new Promise((resolve, reject) => {
            fs.readFile(pathToDb, 'utf-8', (err, content) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            });
        });
    }

    static async remove(id) {
        const card = await Card.fetch();

        const idx = card.notebooks.findIndex((c) => c.id === id);
        const notebook = card.notebooks[idx];

        if(notebook.count === 1) {
            // delete
            card.notebooks = card.notebooks.filter((c) => c.id !== id);
        } else {
            // edit quantity
            card.notebooks[idx].count--;
        }

        card.price -= notebook.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            });
        });
    }

}

module.exports = Card;