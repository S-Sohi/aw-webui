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

    async getTeam(teamId: number) {
      const client = getClient();
      const response = await client.getTeam(teamId);
      return response.data;
    },

    async addMembers(teamId: number, members: number[]) {
      const client = getClient();
      const response = await client.addMembers(teamId, members);
      return response.data;
    },

    async removeMember(teamId: number, memberId: number) {
      const client = getClient();
      const response = await client.removeMember(teamId, memberId);
      return response.data;
    },
  },
});
