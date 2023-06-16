import { ref, reactive, readonly } from 'vue';

export function useActuators() {

  const actuators = reactive([]);
  const refreshActuatorError = ref(null);

  async function loadActuators() {
    console.log("loading actuator definitions");
    const response = await fetch("http://localhost:8080/actuators");
    const data = await response.json();
    Object.assign(actuators, data);
  }

  async function refreshAllActuators() {
    console.log("refreshing all actuators");
    refreshActuatorError.value = null;
    let url = "http://localhost:8080/actuators/current";
    const response = await fetch(url);
    if (response.status === 200) {
      let lastUpdated = new Date();
      const data = await response.json();
      for (let i = 0; i < actuators.length; i++) {
        let a = actuators[i];
        let d = data[a.name];
        if (d !== null && d !== undefined) {
          a.currentState = data[a.name];
        } else {
          a.currentState = '';
        }
        a.lastUpdated = lastUpdated;
      }
    } else {
      refreshActuatorError.value = "Unable to refresh actuators, expected HTTP 200.";
    }
    console.log("actuator state refresh complete");
  }

  async function refreshState(actuatorName) {
    console.log("refreshing actuator by name, actuatorName=" + actuatorName);
    let url = "http://localhost:8080/actuators/current/" + actuatorName;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      for (let i = 0; i < actuators.length; i++) {
        if (actuators[i].name === actuatorName) {
          actuators[i].currentState = data;
          actuators[i].lastUpdated = new Date();
          return;
        }
      }
    } else {
      refreshActuatorError.value = "Unable to refresh actuator, expected HTTP 200.";
    }
  }

  async function activateActuator(actuatorName) {
    let url = "http://localhost:8080/actuators/" + actuatorName + "/enable";
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.status === 200) {
      for (let i = 0; i < actuators.length; i++) {
        if (actuators[i].name === actuatorName) {
          actuators[i].currentState = true;
          return;
        }
      }
    }
  }

  async function deactivateActuator(actuatorName) {
    let url = "http://localhost:8080/actuators/" + actuatorName + "/disable";
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.status === 200) {
      for (let i = 0; i < actuators.length; i++) {
        if (actuators[i].name === actuatorName) {
          actuators[i].currentState = false;
          return;
        }
      }
    }
  }

  const roActuators = readonly(actuators);

  return {
    roActuators, 
    // 
    loadActuators, 
    refreshAllActuators, 
    refreshState, 
    activateActuator, 
    deactivateActuator, 
  }
}
