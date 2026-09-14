import { useEffect, useState } from 'react';
import { userService } from '../services/api';

const USER_KEY = 'studyhub_user';

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export default function useCurrentUser() {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    userService.getCurrentUser().then(setUser).catch(() => {});
  }, []);

  return user;
}
