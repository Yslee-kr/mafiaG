/**
 * Checks if any part of the input contains any banned string and returns the first found banned string
 * @param {*} inputElement The input box where the text is inputed.
 * @param {*} BANNED_STRINGS The list of banned strings to check against.
 * @returns {string|undefined} The first banned string that was found, or undefined if none was found
 */
function hasBannedString(inputElement, BANNED_STRINGS) {
  if (!inputElement || !BANNED_STRINGS.length) return undefined;

  const lowerInput = inputElement.value.toLowerCase();

  // Find the first banned string that exists in the input
  for (const banned of BANNED_STRINGS) {
    if (banned && lowerInput.includes(banned.toLowerCase())) {
      return banned; // Return the actual banned string that was found
    }
  }

  return undefined; // No banned string was found
}

function updateOptionDescription(selectedOption) {
  // Hide all descriptions
  const descriptions = document.getElementsByClassName('option-description');
  for (let i = 0; i < descriptions.length; i++) {
    descriptions[i].style.display = 'none';
  }

  // Show only the selected option's description
  const selectedDesc = document.getElementById(
    `${selectedOption.replace('_', '-')}-desc`,
  );
  if (selectedDesc) {
    selectedDesc.style.display = 'block';
  }
}
