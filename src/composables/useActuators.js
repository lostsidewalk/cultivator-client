import { ref, reactive, readonly } from 'vue';

export function useActuators() {

  const actuators = reactive([]);
  const actuatorServiceError = ref(null);

  async function loadActuators() {
    console.log("loading actuator definitions");
    actuatorServiceError.value = null;
    try {
      const response = await fetch("http://localhost:8080/actuators");
      if (response.status === 200) {
        const data = await response.json();
        Object.assign(actuators, data);
      } else {
        actuatorServiceError.value = "Unable to load actuators, expected HTTP 200.";
      }
    } catch (error) {
      actuatorServiceError.value = "Unable to load actuators due to: " + error.message;
    }
  }

  async function refreshAllActuators() {
    if (actuators.length > 0) {
      console.log("refreshing all actuators");
      actuatorServiceError.value = null;
      try {
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
          console.log("actuator state refresh complete");
        } else {
          actuatorServiceError.value = "Unable to refresh actuators, expected HTTP 200.";
        }
      } catch (error) {
        actuatorServiceError.value = "Unable to refresh actuators due to: " + error.message;
      }
    }
  }

  async function refreshState(actuatorName) {
    console.log("refreshing actuator by name, actuatorName=" + actuatorName);
    actuatorServiceError.value = null;
    try {
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
        actuatorServiceError.value = "Unable to refresh actuator (" + actuatorName + "), expected HTTP 200.";
      }
    } catch (error) {
      actuatorServiceError.value = "Unable to refresh actuator (" + actuatorName + ") due to: " + error.message;
    }
  }

  async function activateActuator(actuatorName) {
    console.log("activating actuator by name, actuatorName=" + actuatorName);
    actuatorServiceError.value = null;
    try {
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
      } else {
        actuatorServiceError.value = "Unable to activate actuator (" + actuatorName + "), expected HTTP 200.";
      }
    } catch (error) {
      actuatorServiceError.value = "Unable to activate actuator (" + actuatorName + ") due to: " + error.message;
    }
  }

  async function deactivateActuator(actuatorName) {
    actuatorServiceError.value = null;
    try {
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
      } else {
        actuatorServiceError.value = "Unable to deactivate actuator (" + actuatorName + "), expected HTTP 200.";
      }
    } catch (error) {
      actuatorServiceError.value = "Unable to deactivate actuator (" + actuatorName + ") due to: " + error.message;
    }
  }

  const roActuators = readonly(actuators);
  const roActuatorServiceError = readonly(actuatorServiceError);

  return {
    roActuators,
    roActuatorServiceError,
    // 
    loadActuators,
    refreshAllActuators,
    refreshState,
    activateActuator,
    deactivateActuator,
  }
}
