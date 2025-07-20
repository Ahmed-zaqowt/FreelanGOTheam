   document.addEventListener('DOMContentLoaded', function() {
            const resetForm = document.getElementById('resetForm');
            const resetBtn = document.getElementById('resetBtn');
            const successMessage = document.getElementById('successMessage');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const passwordToggle = document.getElementById('passwordToggle');
            const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
            const passwordStrength = document.getElementById('passwordStrength');
            const passwordMatch = document.getElementById('passwordMatch');
            
            // Password strength meter
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                
                // Reset rules
                document.querySelectorAll('.password-rules li').forEach(rule => {
                    rule.classList.remove('valid', 'invalid');
                    rule.querySelector('i').className = 'fas fa-circle';
                });
                
                // Check password rules
                if (password.length >= 8) {
                    document.getElementById('rule-length').classList.add('valid');
                    document.querySelector('#rule-length i').className = 'fas fa-check-circle';
                    strength += 25;
                } else {
                    document.getElementById('rule-length').classList.add('invalid');
                }
                
                if (/[A-Z]/.test(password)) {
                    document.getElementById('rule-uppercase').classList.add('valid');
                    document.querySelector('#rule-uppercase i').className = 'fas fa-check-circle';
                    strength += 25;
                } else {
                    document.getElementById('rule-uppercase').classList.add('invalid');
                }
                
                if (/\d/.test(password)) {
                    document.getElementById('rule-number').classList.add('valid');
                    document.querySelector('#rule-number i').className = 'fas fa-check-circle';
                    strength += 25;
                } else {
                    document.getElementById('rule-number').classList.add('invalid');
                }
                
                if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                    document.getElementById('rule-special').classList.add('valid');
                    document.querySelector('#rule-special i').className = 'fas fa-check-circle';
                    strength += 25;
                } else {
                    document.getElementById('rule-special').classList.add('invalid');
                }
                
                // Update strength meter
                passwordStrength.style.width = strength + '%';
                
                // Set color based on strength
                if (strength < 50) {
                    passwordStrength.style.backgroundColor = 'var(--warning)';
                } else if (strength < 75) {
                    passwordStrength.style.backgroundColor = '#ffcc00';
                } else {
                    passwordStrength.style.backgroundColor = 'var(--success)';
                }
            });
            
            // Confirm password validation
            confirmPasswordInput.addEventListener('input', function() {
                if (passwordInput.value && this.value) {
                    if (passwordInput.value === this.value) {
                        passwordMatch.style.display = 'block';
                        passwordMatch.querySelector('p').innerHTML = '<i class="fas fa-check-circle valid"></i> كلمتا المرور متطابقتان';
                    } else {
                        passwordMatch.style.display = 'block';
                        passwordMatch.querySelector('p').innerHTML = '<i class="fas fa-times-circle invalid"></i> كلمتا المرور غير متطابقتان';
                    }
                } else {
                    passwordMatch.style.display = 'none';
                }
            });
            
            // Toggle password visibility
            function togglePasswordVisibility(input, toggle) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                toggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            }
            
            passwordToggle.addEventListener('click', function() {
                togglePasswordVisibility(passwordInput, this);
            });
            
            confirmPasswordToggle.addEventListener('click', function() {
                togglePasswordVisibility(confirmPasswordInput, this);
            });
            
            // Form submission
            resetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                // Validation
                if (password.length < 8) {
                    alert('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
                    return;
                }
                
                if (password !== confirmPassword) {
                    alert('كلمتا المرور غير متطابقتان');
                    return;
                }
                
                // Show loading state
                resetBtn.classList.add('btn-reset-loading');
                resetBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Hide loading state
                    resetBtn.classList.remove('btn-reset-loading');
                    
                    // Show success state
                    resetBtn.classList.add('btn-reset-success');
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    resetForm.reset();
                    passwordStrength.style.width = '0';
                    passwordMatch.style.display = 'none';
                    
                    // Reset rules
                    document.querySelectorAll('.password-rules li').forEach(rule => {
                        rule.classList.remove('valid', 'invalid');
                        rule.querySelector('i').className = 'fas fa-circle';
                    });
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        resetBtn.classList.remove('btn-reset-success');
                        resetBtn.disabled = false;
                    }, 3000);
                }, 2000);
            });
        });