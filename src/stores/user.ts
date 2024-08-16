import { defineStore } from 'pinia';
import { getClient } from '~/util/awclient';

interface User {
  userId: string;
  teamIds: string[];
  roles: number[];
  isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
  state(): User {
    return {
      isLoggedIn: false,
      teamIds: [],
      userId: '',
      roles: [],
    };
  },
  actions: {
    login(username: string, password: string) {
      const client = getClient();
      client.login(username, password);
    },

    // logout() {},

    // getUser() {},
  },
});
