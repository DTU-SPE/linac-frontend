<template>
    <b-row>
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-right p-0">
            <div class="sidebar-sticky pt-3">
                &nbsp;
            </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-3">

          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Confiuration parameters of the floor plan</h1>
            </div>


          <v-form v-model="isValid">
            <v-text-field
              label="Height"
              v-model="height"
              required
              :rules="numberRules"
            ></v-text-field>
            <v-text-field
              label="Width"
              v-model="width"
              required
              :rules="numberRules"
            ></v-text-field>
            <v-text-field
              label="Side Length"
              v-model="tileSideLength"
              required
              :rules="sideLengthRules"
            ></v-text-field>
          </v-form>
          
          <v-btn
            outlined
            text
            @click="submitFloorPlanInfo"
            :disabled="!isValid"
          >
            Continue
          </v-btn>
        </main>

        <b-modal ref="welcome-modal" title="Welcome!" ok-only centered>
        <p>Welcome to Linac, the Smart Environment Simulator! This tool allows you to simulate actions performed by agents in an environment equipped with sensors.</p>
        <p>Here you can find some example data:</p>
        <ul>
            <li><a :href="'/floorPlan.json'" target="_blank"><code>floorPlan.json</code></a>: an example floor plan</li>
            <li><a :href="'/activities.json'" target="_blank"><code>activities.json</code></a>: an example simulation code</li>
        </ul>
        <template #modal-footer>
            <b-button
              variant="outline-primary"
              class="float-right"
              :to="{ name: 'About' }"
              @click="closeWelcomeModal()"
            >Read more&hellip;</b-button>
            <b-button
              variant="primary"
              class="float-right"
              @click="closeWelcomeModal()"
            >Ok</b-button>
        </template>
      </b-modal>
    </b-row>
</template>

<script>
import floorPlanDetails from "@/models/floorPlanDetails";
export default {
  name: "Home",
  data() {
    return {
      width: "",
      height: "",
      tileSideLength: "",
      isValid: true,
      numberRules: [
        (v) => !!v || "Required",
        (v) =>
          /^[1-9]$|^[1-9][0-9]$|^(100)$/.test(v) ||
          "Number should be in the range 1 -100",
      ],
      sideLengthRules:[
        (v) => !!v || "Required",
        (v) =>
          /^\d*\.?\d+$/.test(v) ||
          "Enter a number or a decimal followed by a number",
        (v) => v != 0 || "Enter a positive number"
      ],
    };
  },
  methods: {
    submitFloorPlanInfo() {
      this.$store.commit(
        "updateFloorPlanDetails",
        new floorPlanDetails(
          parseInt(this.width),
          parseInt(this.height),
          Number(this.tileSideLength)
        )
      );
      this.$store.commit( "clearAllInfoOnGrid");

      this.$router.push({ name: "FloorPlan" });
    },
    closeWelcomeModal() {
      this.$refs['welcome-modal'].hide();
    }
  },
  mounted() {
    this.$refs['welcome-modal'].show();
  }
};
</script>
