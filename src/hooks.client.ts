import { auth } from '$lib/firebase/firebase';
import dayjs from 'dayjs';
import { inMemoryPersistence, setPersistence } from 'firebase/auth';

setPersistence(auth, inMemoryPersistence);

dayjs.locale('es');
