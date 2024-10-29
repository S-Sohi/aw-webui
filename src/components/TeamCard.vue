<template>
  <b-card
    :title="team.name"
    tag="article"
    class="team__card"
  >
    <b-card-text> Members count: {{ team.count }} </b-card-text>
    <b-card-text>
      {{ team.description }}
    </b-card-text>
    <b-button variant="primary" @click="navigateToTeamDetail">View</b-button>
  </b-card>
</template>
<script>
export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  methods: {
    navigateToTeamDetail() {
      this.$router.push(`/team/${this.team.id}`);
    },
  },
};
</script>

<style scoped>
.team__card {
  margin: 20px;
  width: 300px;
}
</style>