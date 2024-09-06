<template>
  <div class="team-detail__container">
    <h3 class="name__text">Team: {{ team.name }}</h3>
    <h4>Members:</h4>
    <div>
      <b-table
        show-empty
        striped
        hover
        :items="members"
        :fields="fields"
        :empty-text="'No members found'"
      >
        <template #cell(actions)="data">
          <b-row class="d-flex justify-content-start align-items-center actions__container">
            <b-button @click="editItem(data.item)" size="sm" variant="primary"
              ><icon name="eye"></icon>
              Activity
            </b-button>
            <b-button @click="deleteItem(data.item)" size="sm" variant="danger">
              <icon name="trash"></icon>
              Delete
            </b-button>
          </b-row>
        </template>
      </b-table>
    </div>
    <b-button variant="primary" class="my-5 mx-1" @click="addMember">
      <icon name="plus"></icon>
      Add member
    </b-button>
    <b-modal title="Add Member" ref="addMember" @ok="addNewMembers">
      <UserSelector
        :excludeIds="members.map(member => member.user_id)"
        @selected-members-changed="selectedMembersChanged"
      ></UserSelector>
    </b-modal>
  </div>
</template>

<script>
import 'vue-awesome/icons/trash';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/plus';
import { useTeamStore } from '@/stores/team';
import UserSelector from '@/components/UserSelector.vue';
export default {
  components: {
    UserSelector,
  },
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['name', 'lastname', 'email', { key: 'actions', label: 'actions' }],
      members: [
        // { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        // { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        // { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        // { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
      teamId: this.$route.params['id'],
      team: {},
      teamStore: useTeamStore(),
      selectedMembers: [],
    };
  },
  mounted() {
    this.getTeam();
  },
  methods: {
    async getTeam() {
      this.team = await this.teamStore.getTeam(this.teamId);
      this.members = this.team.members;
    },
    addMember() {
      this.$refs['addMember'].show();
    },
    selectedMembersChanged(membersId) {
      this.selectedMembers = membersId;
    },

    async addNewMembers() {
      if (this.selectedMembers.length > 0) {
        await this.teamStore.addMembers(this.teamId, this.selectedMembers);
        this.getTeam();
      }
    },

    async deleteItem(item) {
      await this.teamStore.removeMember(this.teamId, item.id);
      this.getTeam();
    },
  },
};
</script>
<style lang="scss" scoped>
.team-detail__container {
  height: 80vh;
}
.name__text {
  margin-bottom: 100px;
}
.actions__container {
  gap: 5px;
}
</style>