import equal from "fast-deep-equal";
import { AppStore, RootState } from ".";

/**
 * Utility function to observe the store outside of the React app.
 * @param store The store instance.
 * @param select A function to select something from the store.
 * @param onChange A function that will run when the selection changes (according to a deep equal
 * comparison).
 * @returns A function to unsubscribe to the store.
 */
function observe<Selection>(
  store: AppStore,
  select: (s: RootState) => Selection,
  onChange: (s: Selection) => void
) {
  let currentState: Selection;

  function handleChange() {
    let nextState = select(store.getState());
    if (!equal(nextState, currentState)) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);

  handleChange();

  return unsubscribe;
}

export default observe;
