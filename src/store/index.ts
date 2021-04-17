import Vue from "vue";
import Vuex from "vuex";
import sensor from "../models/sensor";
import position from "../models/position";
import wall from "../models/wall";
import floorPlanDetails from "../models/floorPlanDetails";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    agent: JSON.parse(sessionStorage.getItem("agent")) || new position(0, 0), //default
    sensors: JSON.parse(sessionStorage.getItem("sensors")) || Array<sensor>(), //need to find a better way
    walls: JSON.parse(sessionStorage.getItem("walls")) || Array<wall>(),
    floorPlanDetails: JSON.parse(sessionStorage.getItem("floorPlanDetails")) || new floorPlanDetails(0,0,0)
  },

  mutations: {
    addSensor(state, newSensor: sensor) {
      state.sensors.push(newSensor);
      sessionStorage.setItem("sensors", JSON.stringify(state.sensors));
    },
    addWall(state, newWall: wall) {
      state.walls.push(newWall);
      sessionStorage.setItem("walls", JSON.stringify(state.walls));
    },
    updateAgent(state, newAgentPosition: position) {
      state.agent = newAgentPosition;
      sessionStorage.setItem("agent", JSON.stringify(state.agent));
    },
    updateFloorPlanDetails(state, newFloorPlan: floorPlanDetails){
      state.floorPlanDetails=newFloorPlan;
      sessionStorage.setItem("floorPlanDetails", JSON.stringify(state.floorPlanDetails));
    },
    clearAllSensorAndWallInfo(state) {
      state.sensors = Array<sensor>();
      state.walls = Array<wall>();
      sessionStorage.setItem("sensors", JSON.stringify(state.sensors));
      sessionStorage.setItem("walls", JSON.stringify(state.walls));
    },
  },
  /*,
    actions: {
        addSensor(context, newSensor: sensor) {
            context.commit('addSensor', newSensor);
        },
        addWall(context,newWall: position){
            context.commit('addWall',newWall);
        }
    }*/
});
