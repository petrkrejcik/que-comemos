import getFirestore from '$lib/firebase/getFirestore';
import { doc } from 'firebase/firestore';

export default (weekId: string, groupId: string) => {
	console.log('🛎 ', `groups/${groupId}/weekPlans`, weekId);
	return doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId);
};
