import {collection, onSnapshot} from 'firebase/firestore';
import {firestore} from '../lib/__firebase__';
import {DocumentData, QuerySnapshot} from 'firebase/firestore';

export const getQuestionsSnapshot = async (): Promise<QuerySnapshot<DocumentData>> => {
  const snapshot = await onSnapshot(collection(firestore, 'questions'), docs => docs);
  return snapshot;
};
