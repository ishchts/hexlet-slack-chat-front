import { useContext } from 'react';
import { authContext } from './context.js';

export const useAuth = () => useContext(authContext);

export default {};
