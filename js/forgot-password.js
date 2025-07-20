   document.addEventListener('DOMContentLoaded', function() {
            const resetForm = document.getElementById('resetForm');
            const resetBtn = document.getElementById('resetBtn');
            const successMessage = document.getElementById('successMessage');
            
            resetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                
                // Basic email validation
                if (!isValidEmail(email)) {
                    alert('الرجاء إدخال بريد إلكتروني صحيح');
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
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        resetBtn.classList.remove('btn-reset-success');
                        resetBtn.disabled = false;
                    }, 3000);
                }, 2000);
            });
            
            // Email validation
            function isValidEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        });