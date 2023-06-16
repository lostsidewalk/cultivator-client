import { ref, reactive, readonly } from 'vue';

export function useSensors() {

  const sensors = reactive([]);
  const refreshSensorError = ref(null);

  async function loadSensorDefinitions() {
    console.log("loading sensor definitions");
    const response = await fetch("http://localhost:8080/sensors");
    const data = await response.json();
    Object.assign(sensors, data);
  }

  async function refreshAllSensors() {
    console.log("refreshing all sensors");
    refreshSensorError.value = null;
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
    } else {
      refreshSensorError.value = "Unable to refresh sensors, expected HTTP 200.";
    }
    console.log("sensor refresh complete");
  }

  async function refreshSensor(sensorName) {
    console.log("refreshing sensor by name, sensorName=" + sensorName);
    refreshSensorError.value = null;
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
      refreshSensorError.value = "Unable to refresh sensor, expected HTTP 200.";
    }
  }

  const roSensors = readonly(sensors);
  const roRefreshSensorError = readonly(refreshSensorError);

  return {
    roSensors, 
    roRefreshSensorError,
    // 
    loadSensorDefinitions, 
    refreshAllSensors, 
    refreshSensor, 
  }
}
