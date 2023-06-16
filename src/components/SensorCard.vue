<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        SENSOR: {{ sensorDescription }}
      </div>
      <hr class="py-1" />
      <div class="mt-2" v-if="sensorValueDescription">
        <p class="text-sm text-slate-500">
          <span class="font-medium">Value:</span> {{ sensorValueDescription }}
        </p>
        <p class="text-sm text-slate-500">
          <span class="font-medium">Last Updated:</span> {{ lastUpdated ? lastUpdated.toLocaleString() : 'N/A' }}
        </p>
      </div>
      <div class="space-x-2 flex">
        <button
          class="mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-violet-500 rounded hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
          @click="$emit('refreshValue')">
          REFRESH
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sensorDefinition: { type: Object, required: true },
    sensorValue: { default: null },
    lastUpdated: { type: Date, default: null }
  },
  computed: {
    sensorDescription() {
      let description = `${this.sensorDefinition.name} / PIN ${this.sensorDefinition.pinAddress}`;
      if (this.sensorDefinition.timeout) {
        description += ` (${this.sensorDefinition.timeout}ms timeout)`;
      }
      return description;
    },
    sensorValueDescription() {
      if (this.sensorValue === null || this.sensorValue === undefined || this.sensorValue === '') {
        return '<none>';
      } else {
        return this.sensorValue.toString();
      }
    }
  },
  emits: ["refreshValue"]
};
</script>
