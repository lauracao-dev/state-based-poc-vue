import "./style.css";
import { createApp, computed } from "vue/dist/vue.esm-bundler";
import {
  useStorage,
  useActiveElement,
  useToggle,
  useAsyncState,
} from "@vueuse/core";

const app = createApp({
  name: "app",
  template: "#app-template",
  setup() {
    // simple toggle composable
    const [showCounter, toggle] = useToggle(true);

    // reactive ref being loaded from local storage
    const count = useStorage("my-count", 0);

    // computeds
    const toggleText = computed(() => `Show counter: ${showCounter.value}`);
    const countText = computed(() => `Current count: ${count.value}`);
    const doubleCountText = computed(() => `Double count: ${count.value * 2}`);

    // composable that gives us reactive state based on async function
    const { state, isReady, isLoading } = useAsyncState(async () => {
      await new Promise((r) => setTimeout(r, 2000));
      return "State based POC - Vue";
    }, "Loading title...");

    // composable that detects active element
    const activeElement = useActiveElement();
    const activeElementText = computed(
      () =>
        `Current active element tag: ${activeElement.value?.tagName || "null"}`
    );

    function handleIncreaseCountClick() {
      count.value = count.value + 1;
    }
    return {
      state,
      toggleText,
      showCounter,
      countText,
      doubleCountText,
      activeElementText,
      toggle,
      handleIncreaseCountClick,
    };
  },
});
app.mount("#app");
