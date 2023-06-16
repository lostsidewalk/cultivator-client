<template>
  <main>
    <div class="border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <!-- dashboard -->
        <Tab label="Dashboard" :is-selected="selectedTab === 'DASHBOARD'" @select="selectedTab = 'DASHBOARD'">
          <template v-slot:path>
            <path
              d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
            </path>
          </template>
        </Tab>
        <!-- sensors -->
        <Tab label="Sensors" :is-selected="selectedTab === 'SENSORS'" @select="selectedTab = 'SENSORS'">
          <template v-slot:path>
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"></path>
          </template>
        </Tab>
        <!-- actuators -->
        <Tab label="Actuators" :is-selected="selectedTab === 'ACTUATORS'" @select="selectedTab = 'ACTUATORS'">
          <template v-slot:path>
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z">
            </path>
          </template>
        </Tab>
        <!-- rules -->
        <Tab label="Rules" :is-selected="selectedTab === 'RULES'" @select="selectedTab = 'RULES'">
          <template v-slot:path>
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"></path>
          </template>
        </Tab>
      </ul>
    </div>
    <!-- dashboard -->
    <div v-if="selectedTab === 'DASHBOARD'" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SensorCard v-for="sensor in roSensors" :key="sensor" :sensorDefinition="sensor"
          :sensorValue="sensor.currentValue" :lastUpdated="sensor.lastUpdated"
          @refreshValue="$event => refreshSensor(sensor.name)" />
        <ActuatorCard v-for="actuator in roActuators" :key="actuator" :actuatorDefinition="actuator"
          :actuatorState="actuator.currentState" :lastUpdated="actuator.lastUpdated"
          @refreshState="$event => refreshState(actuator.name)" @activate="$event => activateActuator(actuator.name)"
          @deactivate="$event => deactivateActuator(actuator.name)" />
      </div>
    </div>
    <!-- sensors -->
    <div v-if="selectedTab === 'SENSORS'" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SensorCard v-for="sensor in roSensors" :key="sensor" :sensorDefinition="sensor"
          :sensorValue="sensor.currentValue" :lastUpdated="sensor.lastUpdated"
          @refreshValue="$event => refreshSensor(sensor.name)" />
      </div>
      <div v-if="roRefreshSensorError" class="text-red-500 mt-4">{{ roRefreshSensorError }}</div>
    </div>
    <!-- actuators -->
    <div v-if="selectedTab === 'ACTUATORS'" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ActuatorCard v-for="actuator in roActuators" :key="actuator" :actuatorDefinition="actuator"
          :actuatorState="actuator.currentState" :lastUpdated="actuator.lastUpdated"
          @refreshState="$event => refreshState(actuator.name)" @activate="$event => activateActuator(actuator.name)"
          @deactivate="$event => deactivateActuator(actuator.name)" />
      </div>
    </div>
    <!-- rules -->
    <div v-if="selectedTab === 'RULES'" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <RuleCard v-for="rule in roRules" :key="rule" :ruleDefinition="rule" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useSensors } from '@/composables/useSensors.js';
import { useActuators } from '@/composables/useActuators.js';
import { useRules } from '@/composables/useRules.js';
import Tab from './components/Tab.vue';
import SensorCard from './components/SensorCard.vue';
import ActuatorCard from './components/ActuatorCard.vue';
import RuleCard from './components/RuleCard.vue';

const selectedTab = ref('DASHBOARD');

const {
  roSensors,
  roRefreshSensorError,
  loadSensorDefinitions,
  refreshAllSensors,
  refreshSensor,
} = useSensors();

const {
  roActuators,
  loadActuators,
  refreshState,
  refreshAllActuators,
  activateActuator,
  deactivateActuator,
} = useActuators();

const { roRules, loadRules } = useRules();

onBeforeMount(() => {
  loadSensorDefinitions().then(() => refreshAllSensors());
  loadActuators().then(() => refreshAllActuators());
  loadRules();
});
</script>