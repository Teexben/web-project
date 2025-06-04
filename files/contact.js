document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  
  if (bookingForm) {
    // Add error message elements dynamically
    addErrorContainers();
    
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      
      if (validateForm()) {
        // Form is valid - show success message
        showSuccessMessage();
        // In production, you would submit the form here
        // bookingForm.submit();
      }
    });
    
    // Add real-time validation
    setupLiveValidation();
  }
  
  function addErrorContainers() {
    const fields = [
      { id: 'name', message: 'Please enter your full name' },
      { id: 'email', message: 'Please enter a valid email' },
      { id: 'date', message: 'Please select a date' }
    ];
    
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.id = `${field.id}Error`;
        errorDiv.textContent = field.message;
        input.parentNode.appendChild(errorDiv);
      }
    });
  }
  
  function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError(name, 'Please enter your full name');
      isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate date
    const date = document.getElementById('date');
    if (!date.value) {
      showError(date, 'Please select a consultation date');
      isValid = false;
    }
    
    return isValid;
  }
  
  function showError(input, message) {
    const formGroup = input.parentNode;
    formGroup.classList.add('error');
    
    const errorElement = document.getElementById(`${input.id}Error`);
    if (errorElement) {
      errorElement.style.display = 'block';
      errorElement.textContent = message;
    }
  }
  
  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    const errorInputs = document.querySelectorAll('.form-group.error');
    errorInputs.forEach(group => group.classList.remove('error'));
  }
  
  function setupLiveValidation() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    
    if (name) name.addEventListener('input', validateName);
    if (email) email.addEventListener('input', validateEmail);
    if (date) date.addEventListener('change', validateDate);
  }
  
  function validateName() {
    const name = document.getElementById('name');
    if (name.value.trim()) {
      clearError(name);
    }
  }
  
  function validateEmail() {
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
      clearError(email);
    }
  }
  
  function validateDate() {
    const date = document.getElementById('date');
    if (date.value) {
      clearError(date);
    }
  }
  
  function clearError(input) {
    const formGroup = input.parentNode;
    formGroup.classList.remove('error');
    
    const errorElement = document.getElementById(`${input.id}Error`);
    if (errorElement) errorElement.style.display = 'none';
  }
  
  function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="background: #d4edda; color: #155724; padding: 15px; 
                  border-radius: 6px; margin-top: 20px; text-align: center;">
        <strong>Thank you!</strong> Your consultation request has been submitted. 
        We'll contact you shortly to confirm your appointment.
      </div>
    `;
    
    // Insert after the form
    bookingForm.parentNode.insertBefore(successDiv, bookingForm.nextSibling);
    
    // Scroll to show message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Reset form after 5 seconds
    setTimeout(() => {
      bookingForm.reset();
      successDiv.remove();
    }, 5000);
  }
});