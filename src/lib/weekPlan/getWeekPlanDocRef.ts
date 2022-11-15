import getFirestore from '$lib/firebase/getFirestore';
import { doc } from 'firebase/firestore';

export default (weekId: string, groupId: string) => {
	return doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId);
};
