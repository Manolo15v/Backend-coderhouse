const fs = require('fs')

class Container {
    constructor(filePath) {
        this.filePath = filePath
        this.date = new Date()
    }

    async #readFile() {
        try {
            const res = await fs.promises.readFile(this.filePath, "utf-8");
            if (res.length === 0) {// Si el archivo esta vacio
                return res
            } else {
                const content = JSON.parse(res);

                return content
            }


        } catch (error) {
            console.log(error);
        }
    }

    async #writeFile(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data), "utf-8");
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        const messages = await this.#readFile();
        //
        const padL = (str, len = 2, chr = `0`) => `${str}`.padStart(len, chr);

        let messageDate = `${padL(this.date.getMonth() + 1)}/${padL(this.date.getDate())}/${this.date.getFullYear()} ${padL(this.date.getHours())}:${padL(this.date.getMinutes())}:${padL(this.date.getSeconds())}`; 
        //  ---> solucion obviamente sacada de stackoverflow porque la api de date es horrible 
      

        if (messages.length === 0) {
            await this.#writeFile([{ ...data, date: messageDate }]);
        } else {
            await this.#writeFile([...messages, { ...data, date: messageDate }]);
        }
    }

    async getAll() {
        const messages = await this.#readFile();
        return messages
    }
}

const container = new Container('messages.txt');

module.exports = container 