import { openDB } from 'idb';

const DB_NAME = 'tv-shows-db';
const STORE_NAME = 'shows';
const DB_VERSION = 1;

let dbPromise;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
};

export const saveShowsToCache = async (query, data) => {
  try {
    const db = await getDB();
    await db.put(STORE_NAME, data, `search:${query}`);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const getShowsFromCache = async (query) => {
  try {
    const db = await getDB();
    return await db.get(STORE_NAME, `search:${query}`);
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};
