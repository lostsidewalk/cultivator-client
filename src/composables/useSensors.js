import { ref, reactive, readonly } from 'vue';

export function useSensors() {

  const sensors = reactive([]);
  const sensorServiceError = ref(null);

  async function loadSensorDefinitions() {
    console.log("loading sensor definitions");
    sensorServiceError.value = null;
    try {
      const response = await fetch("http://localhost:8080/sensors");
      if (response.status === 200) {
        const data = await response.json();
        Object.assign(sensors, data);
      } else {
        sensorServiceError.value = "Unable to load sensors, expected HTTP 200.";
      }
    } catch (error) {
      sensorServiceError.value = "Unable to load sensors due to: " + error.message;
    }
  }

  async function refreshAllSensors() {
    if (sensors.length > 0) {
      console.log("refreshing all sensors");
      sensorServiceError.value = null;
      try {
        let url = "http://localhost:8080/sensors/current";
        const response = await fetch(url);
        if (response.status === 200) {
          let lastUpdated = new Date();
          const data = await response.json();
          for (let i = 0; i < sensors.length; i++) {
            let s = sensors[i];
            let d = data[s.name];
            if (d !== null && d !== undefined) {
              s.currentValue = data[s.name];
            } else {
              s.currentValue = '';
            }
            s.lastUpdated = lastUpdated;
          }
          console.log("sensor value refresh complete");
        } else {
          sensorServiceError.value = "Unable to refresh sensors, expected HTTP 200.";
        }
      } catch (error) {
        sensorServiceError.value = "Unable to refresh sensors due to: " + error.message;
      }
    }
  }

  async function refreshSensor(sensorName) {
    console.log("refreshing sensor by name, sensorName=" + sensorName);
    sensorServiceError.value = null;
    try {
      let url = "http://localhost:8080/sensors/current/" + sensorName;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.text();
        for (let i = 0; i < sensors.length; i++) {
          if (sensors[i].name === sensorName) {
            sensors[i].currentValue = data;
            sensors[i].lastUpdated = new Date();
            return;
          }
        }
      } else {
        sensorServiceError.value = "Unable to refresh sensor (" + sensorName + "), expected HTTP 200.";
      }
    } catch (error) {
      sensorServiceError.value = "Unable to refresh sensor (" + sensorName + ") due to: " + error.message;
    }
  }

  const roSensors = readonly(sensors);
  const roSensorServiceError = readonly(sensorServiceError);

  return {
    roSensors,
    roSensorServiceError,
    // 
    loadSensorDefinitions,
    refreshAllSensors,
    refreshSensor,
  }
}
