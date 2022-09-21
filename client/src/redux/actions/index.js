export const RESET_FILTERS = "RESET_FILTERS";

export const resetFilter = () => {
  return {
    type: RESET_FILTERS,
    payload: "",
  };
};
