import type { Timestamp } from 'firebase/firestore';

export interface IDataEntry {
  userUid?: string;
  timestamp?: Timestamp | Date;
  id?: string;
}
