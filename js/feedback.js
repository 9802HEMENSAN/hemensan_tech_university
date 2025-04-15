document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    
    // Rating system interaction
    const ratingOptions = document.querySelectorAll('.rating-option input');
    ratingOptions.forEach(option => {
        option.addEventListener('change', function() {
            document.querySelectorAll('.rating-option label').forEach(label => {
                label.classList.remove('active');
            });
            
            if (this.checked) {
                this.nextElementSibling.classList.add('active');
            }
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            setTimeout(() => {
                const feedbackData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    studentId: document.getElementById('studentId').value || 'N/A',
                    rating: document.querySelector('input[name="rating"]:checked').value,
                    feedbackTypes: Array.from(document.querySelectorAll('input[name="feedbackType"]:checked'))
                        .map(el => el.value),
                    feedback: document.getElementById('feedback').value,
                    suggestions: document.getElementById('suggestions').value,
                    date: new Date().toISOString()
                };
                
                Storage.addFeedback(feedbackData);
                
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                successMessage.textContent = 'Thank you for your valuable feedback!';
                
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Feedback';
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        document.querySelectorAll('.error').forEach(el => {
            el.style.display = 'none';
        });

        requiredFields.forEach(field => {
            const errorElement = document.getElementById(`${field.id}Error`);
            
            if (!field.value.trim()) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
                isValid = false;
            } else if (field.type === 'email' && !validateEmail(field.value)) {
                errorElement.textContent = 'Please enter a valid email address';
                errorElement.style.display = 'block';
                isValid = false;
            }
        });

        const ratingSelected = document.querySelector('input[name="rating"]:checked');
        if (!ratingSelected) {
            document.getElementById('ratingError').textContent = 'Please select a rating';
            document.getElementById('ratingError').style.display = 'block';
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});