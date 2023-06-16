import { ref, reactive, readonly } from 'vue';

export function useRules() {

  const rules = reactive([]);
  const ruleServiceError = ref(null);

  async function loadRules() {
    ruleServiceError.value = null;
    try {
      const response = await fetch("http://localhost:8080/rules");
      if (response.status === 200) {
        const data = await response.json();
        Object.assign(rules, data);
      } else {
        ruleServiceError.value = "Unable to load rules, expected HTTP 200.";
      }
    } catch (error) {
      ruleServiceError.value = "Unable to load rules due to: " + error.message;
    }
  }

  const roRules = readonly(rules);
  const roRuleServiceError = readonly(ruleServiceError);

  return {
    roRules,
    roRuleServiceError,
    // 
    loadRules,
  }
}
