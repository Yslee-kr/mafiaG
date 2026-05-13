/**
 * Initializes a custom dropdown component with keyboard navigation and accessibility
 * @param {Object} config - Configuration object
 * @param {string} config.dropdownId - ID of the dropdown container element
 * @param {string} config.labelId - ID of the label element that displays current selection
 * @param {string} config.panelId - ID of the dropdown panel element
 * @param {string} config.optionSelector - CSS selector for option elements
 * @param {string} config.initialValue - Initial selected value
 * @param {Function} config.onChange - Callback function when selection changes (receives new value)
 * @returns {Object} - Object with methods to interact with the dropdown
 */
function initializeCustomDropdown(config) {
  const {
    dropdownId,
    labelId,
    panelId,
    optionSelector,
    initialValue,
    onChange,
  } = config;

  const dropdown = document.getElementById(dropdownId);
  const currentLabel = document.getElementById(labelId);
  const dropdownPanel = document.getElementById(panelId);
  const options = dropdownPanel.querySelectorAll(optionSelector);

  let currentValue = initialValue;

  // Initialize with current value
  options.forEach((option) => {
    const value = option.getAttribute('data-value');
    if (value === currentValue) {
      option.ariaSelected = 'true';
      const checkmark = option.querySelector('.dropdown-checkmark');
      if (checkmark) {
        checkmark.classList.add('codicon-check');
      }
      currentLabel.textContent = option.querySelector('span').textContent;
    }
  });

  // Toggle dropdown on click
  dropdown.addEventListener('click', () => {
    const isOpen = dropdown.getAttribute('aria-expanded') === 'true';
    dropdown.setAttribute('aria-expanded', !isOpen);
    if (!isOpen) {
      const selectedOption = Array.from(options).find(
        (opt) => opt.ariaSelected === 'true',
      );
      if (selectedOption) {
        selectedOption.focus();
      }
    }
  });

  // Toggle dropdown on Enter key
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const isOpen = dropdown.getAttribute('aria-expanded') === 'true';
      dropdown.setAttribute('aria-expanded', !isOpen);
      if (!isOpen) {
        const selectedOption = Array.from(options).find(
          (opt) => opt.ariaSelected === 'true',
        );
        if (selectedOption) {
          selectedOption.focus();
        }
      }
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Close dropdown on blur
  dropdown.addEventListener('focusout', (e) => {
    if (!dropdown.contains(e.relatedTarget)) {
      dropdown.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle option selection
  options.forEach((option, index) => {
    // Click handler
    option.addEventListener('click', (e) => {
      const value = option.getAttribute('data-value');

      // Update checkmarks
      options.forEach((opt) => {
        opt.ariaSelected = 'false';
        const checkmark = opt.querySelector('.dropdown-checkmark');
        if (checkmark) {
          checkmark.classList.remove('codicon-check');
        }
      });

      option.ariaSelected = 'true';
      const checkmark = option.querySelector('.dropdown-checkmark');
      if (checkmark) {
        checkmark.classList.add('codicon-check');
      }

      currentLabel.textContent = option.querySelector('span').textContent;
      currentValue = value;
      dropdown.setAttribute('aria-expanded', 'false');
      dropdown.focus();

      if (onChange) {
        onChange(value);
      }

      e.stopPropagation();
    });

    // Hover handler
    option.addEventListener('mouseenter', () => {
      option.focus();
    });

    // Keyboard navigation
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        option.click();
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'Escape') {
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.focus();
        e.stopPropagation();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = Math.max(
          0,
          Math.min(options.length - 1, index + delta),
        );
        options[nextIndex].focus();
        e.preventDefault();
      }
    });
  });

  return {
    getValue: () => currentValue,
    setValue: (value) => {
      const option = Array.from(options).find(
        (opt) => opt.getAttribute('data-value') === value,
      );
      if (option) {
        option.click();
      }
    },
  };
}
