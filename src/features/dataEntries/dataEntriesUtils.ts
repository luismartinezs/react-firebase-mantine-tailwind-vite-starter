import { isToday } from 'date-fns';

import { IDataEntry } from './dataEntriesTypes';

// Just some examples of utility functions that may be needed

export const getEntriesByFilter = (entries: IDataEntry[], filter: (entry: IDataEntry) => boolean) => {
  return entries.filter((entry) => {
    if (filter(entry)) {
      return true;
    }
    return false;
  });
};

export const getTodayEntries = (entries: IDataEntry[]) => {
  return getEntriesByFilter(entries, (entry) => {
    if (!entry.timestamp) {
      return false;
    }

    const date = entry.timestamp instanceof Date ? entry.timestamp : entry.timestamp.toDate();

    return isToday(date);
  });
};
