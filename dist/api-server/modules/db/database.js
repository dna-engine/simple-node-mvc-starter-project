import loki from 'lokijs';
import { config } from '../../config.js';
import { dataset } from './dataset.js';
import { log } from '../system/log.js';
const collection = (name) => {
    if (!database.state.db)
        throw new Error('[simple] Database not connected.');
    const documents = database.state.collectionMap[name];
    if (!documents)
        throw new Error('[simple] Invalid database collection: ' + name);
    return documents;
};
const database = {
    state: {
        client: null,
        db: { collection: collection },
        collectionMap: {},
    },
    getDb() {
        if (!database.state.client)
            throw new Error('[simple] Database not connected.');
        return database.state.db;
    },
    addCollection(data) {
        const collection = database.state.client.addCollection(data.name);
        database.state.collectionMap[data.name] = collection;
        return collection.insert(data.documents);
    },
    connect() {
        if (database.state.client)
            throw new Error('[simple] Database already connected.');
        database.state.client = new loki(config.db.name);
        dataset.forEach(database.addCollection);
        log.info('db', 'connect', true);
        return new Promise(resolve => resolve());
    },
    close() {
        database.state.client = null;
        database.state.collectionMap = {};
        log.info('db', 'close', true);
        return new Promise(resolve => resolve());
    },
};
export { database };
