import { Entry } from '../types';

const STORAGE_KEY = 'quiet_archivist_entries';

export const getEntries = (): Entry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEntry = (entry: Entry) => {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const deleteEntry = (id: string) => {
  const entries = getEntries();
  const filtered = entries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
