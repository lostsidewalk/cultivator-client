import { reactive, readonly } from 'vue';

export function useRules() {

  const rules = reactive([]);

  async function loadRules() {
    const response = await fetch("http://localhost:8080/rules");
    const data = await response.json();
    Object.assign(rules, data);
  }

  const roRules = readonly(rules);

  return {
    roRules, 
    // 
    loadRules, 
  }
}
