<template>
    <b-tabs content-class="mt-3">
        <!-- <b-tab title="Activity">
            <Activity></Activity>
        </b-tab> -->
        <b-tab title="Timeline">
            <timeline></timeline>
        </b-tab>
    </b-tabs>
</template>
<script>
import Activity from "./activity/Activity.vue";
import Timeline from "./Timeline.vue";
export default {
    components:{
        // Activity,
        Timeline
    },
    data() {
        return {

        }
    },
}
</script>