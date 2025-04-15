document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const studentData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || '',
                programme: document.getElementById('programme').value,
                address: document.getElementById('address').value,
                serialNumber: document.getElementById('serialNumber').value,
                registrationDate: new Date().toISOString()
            };
            
            Storage.addStudent(studentData);
            
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Registration submitted successfully!';
            
            form.reset();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
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
            } else if (field.id === 'phone' && !validatePhone(field.value)) {
                errorElement.textContent = 'Please enter a valid phone number';
                errorElement.style.display = 'block';
                isValid = false;
            }
        });

        const dob = document.getElementById('dob');
        if (dob.value) {
            const dobDate = new Date(dob.value);
            const today = new Date();
            const minAgeDate = new Date();
            minAgeDate.setFullYear(today.getFullYear() - 16);
            
            if (dobDate > minAgeDate) {
                document.getElementById('dobError').textContent = 'You must be at least 16 years old';
                document.getElementById('dobError').style.display = 'block';
                isValid = false;
            }
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\-+()]{10,15}$/;
        return re.test(phone);
    }
});