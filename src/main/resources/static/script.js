
document.addEventListener('DOMContentLoaded', () => {
    const nationalitySelect = document.getElementById('nationality');
    const idContainer = document.getElementById('idContainer');
    const passportContainer = document.getElementById('passportContainer');
    const idInput = document.getElementById('idNumber');
    const passportInput = document.getElementById('passportNumber');
    const form = document.getElementById('onboardingForm');
    const messageDiv = document.getElementById('message');

    // Toggle fields based on nationality
    nationalitySelect.addEventListener('change', (event) => {
        const selectedCountry = event.target.value;

        if (selectedCountry === 'South Africa') {
            idContainer.style.display = 'block';
            passportContainer.style.display = 'none';
            idInput.setAttribute('required', 'true');
            passportInput.removeAttribute('required');
            passportInput.value = '';
        } else if (selectedCountry) {
            idContainer.style.display = 'none';
            passportContainer.style.display = 'block';
            passportInput.setAttribute('required', 'true');
            idInput.removeAttribute('required');
            idInput.value = '';
        } else {
            idContainer.style.display = 'none';
            passportContainer.style.display = 'none';
            idInput.removeAttribute('required');
            passportInput.removeAttribute('required');
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing...";

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/clients/register', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                messageDiv.style.color = 'green';
                messageDiv.innerText = 'Application submitted successfully!';
                form.reset();
                idContainer.style.display = 'none';
                passportContainer.style.display = 'none';
            } else {
                messageDiv.style.color = 'red';
                messageDiv.innerText = 'Error submitting application. Please try again.';
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Network error occurred.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Submit Application";
        }
    });
});
