<template>
  <main>
    <!-- sensors -->
    <div v-if="roSensors.length > 0">
      <SensorCard v-for="sensor in roSensors" :key="sensor" 
        :sensorDefinition="sensor" 
        :sensorValue="sensor.currentValue"
        :lastUpdated="sensor.lastUpdated"
        @refreshValue="$event => refreshSensor(sensor.name)" />
    </div>
    <div v-if="roRefreshSensorError">
      {{ roRefreshSensorError }}
    </div>
    <!-- actuators -->
    <div v-if="roActuators.length > 0">
      <ActuatorCard v-for="actuator in roActuators" :key="actuator" 
        :actuatorDefinition="actuator" 
        :actuatorState="actuator.currentState"
        :lastUpdated="actuator.lastUpdated"
        @refreshState="$event => refreshState(actuator.name)" 
        @activate="$event => activateActuator(actuator.name)" 
        @deactivate="$event => deactivateActuator(actuator.name)" />
    </div>
    <!-- rules -->
    <div v-if="roRules.length > 0">
      <RuleCard v-for="rule in roRules" :key="rule" 
        :ruleDefinition="rule" />
    </div>
  </main>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useSensors } from '@/composables/useSensors.js';
import { useActuators } from '@/composables/useActuators.js';
import { useRules } from '@/composables/useRules.js';

import SensorCard from './components/SensorCard.vue';
import ActuatorCard from './components/ActuatorCard.vue';
import RuleCard from './components/RuleCard.vue';

const { 
  roSensors, 
  roRefreshSensorError, 
  // 
  loadSensorDefinitions, 
  refreshAllSensors, 
  refreshSensor, 
} = useSensors();

const { 
  roActuators, 
  // 
  loadActuators, 
  refreshState, 
  refreshAllActuators, 
  activateActuator, 
  deactivateActuator, 
} = useActuators();

const { 
  roRules, 
  // 
  loadRules, 
} = useRules();

onBeforeMount(() => {
  loadSensorDefinitions().then(() => refreshAllSensors());
  
  loadActuators().then(() => refreshAllActuators());

  loadRules();
});
</script>
