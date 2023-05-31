import { createContext } from 'react';
import { UserAttributes } from '../db/models/user';

/* eslint-disable @typescript-eslint/no-explicit-any */
const UserProfileContext = createContext<UserAttributes & any>({});

export default UserProfileContext;
