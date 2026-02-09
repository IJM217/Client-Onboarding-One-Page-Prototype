
document.addEventListener('DOMContentLoaded', () => {
    const nationalitySelect = document.getElementById('nationality') as HTMLSelectElement;
    const idContainer = document.getElementById('idContainer') as HTMLDivElement;
    const passportContainer = document.getElementById('passportContainer') as HTMLDivElement;
    const idInput = document.getElementById('idNumber') as HTMLInputElement;
    const passportInput = document.getElementById('passportNumber') as HTMLInputElement;
    const form = document.getElementById('onboardingForm') as HTMLFormElement;
    const messageDiv = document.getElementById('message') as HTMLDivElement;

    // Toggle fields based on nationality
    nationalitySelect.addEventListener('change', (event) => {
        const target = event.target as HTMLSelectElement;
        const selectedCountry = target.value;

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

        const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
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
