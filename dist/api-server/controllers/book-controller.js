import { database } from '../modules/db/database.js';
import { restError } from '../modules/system/rest-error.js';
const model = {
    book(data) {
        return {
            id: data.id,
            title: data.title,
            author: data.author,
            retrieved: new Date().toDateString(),
        };
    },
};
const bookController = {
    save(request, response) {
        const resource = restError.notImplemented();
        response.json(resource);
    },
    read(request, response) {
        const id = request.params.id;
        const db = database.getDb();
        const data = db.collection('books').findOne({ id: Number(id) });
        const resource = data ? model.book(data) : restError.notFound();
        response.json(resource);
    },
    list(request, response) {
        const db = database.getDb();
        const resource = db.collection('books').find().map(model.book);
        response.json(resource);
    },
    delete(request, response) {
        const id = request.params.id;
        const db = database.getDb();
        const data = db.collection('books').findOne({ id: Number(id) });
        const resource = data ? restError.notImplemented() : restError.notFound();
        response.json(resource);
    },
};
export { bookController };
