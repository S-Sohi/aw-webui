import { defineStore } from 'pinia';
import { getClient } from '~/util/awclient';
import route from '../route';

interface TeamModel {
  id: number;
  name: string;
  description: string;
  ownerId: number;
}

interface State {
  teams: TeamModel[];
}

export const useTeamStore = defineStore('team', {
  state(): State {
    return {
      teams: [],
    };
  },
  actions: {
    async getTeams() {
      const client = getClient();
      const response = await client.getTeams();
      this.teams = response.data;
    },

    async addTeam(team: TeamModel) {
      const client = getClient();
      await client.addTeam({ name: team.name, description: team.description });
      await this.getTeams();
    },

    editTeam(team: TeamModel) {
      const client = getClient();
      client.editTeam(team);
    },
  },
});
