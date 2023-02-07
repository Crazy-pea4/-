function showInputValue(inpRef) {
  return {
    type: "show-input-value",
    value: inpRef.current.value,
  };
}

export { showInputValue };
