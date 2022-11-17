import fs from 'fs'
import { normalize, schema } from 'normalizr'

export default class MessagesContainer {
    constructor(filePath) {
        this.filePath = filePath
        this.id = 1
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

    async #getAll() {
        const messages = await this.#readFile();
        return messages
    }

    #normalizeMessage(messages) {
        const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

        const schemaMessage = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' });

        const schemaMessages = new schema.Entity('posts', { messages: [schemaMessage] }, { idAttribute: 'id' });

        return normalize(messages, schemaMessages);
    }

    async save(data) {
        console.log(data);
        const messages = await this.#readFile();
        //
        const padL = (str, len = 2, chr = `0`) => `${str}`.padStart(len, chr);

        let messageDate = `${padL(this.date.getMonth() + 1)}/${padL(this.date.getDate())}/${this.date.getFullYear()} ${padL(this.date.getHours())}:${padL(this.date.getMinutes())}:${padL(this.date.getSeconds())}`;
        //  ---> solucion obviamente sacada de stackoverflow porque la api de date es horrible 

        if (messages.length === 0) {
            await this.#writeFile([{ ...data, date: messageDate, id: this.id }]);
        } else {
            this.id = messages[messages.length - 1].id + 1
            await this.#writeFile([...messages, { ...data, date: messageDate, id: this.id  }]);
        }
    }

    async getAllNormalized() {
        const messages = await this.#getAll();
        const normalized = this.#normalizeMessage({ id: 'messages', messages });
        return normalized
    }

}
