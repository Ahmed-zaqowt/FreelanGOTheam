     document.addEventListener('DOMContentLoaded', function() {
            // Form steps management
            const steps = document.querySelectorAll('.form-step');
            const progressSteps = document.querySelectorAll('.progress-step');
            const progressBar = document.getElementById('progressBar');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            let currentStep = 0;
            
            // Update form steps and progress bar
            function updateStep(n) {
                // Hide all steps
                steps.forEach(step => {
                    step.classList.remove('active');
                });
                
                // Show current step
                steps[n].classList.add('active');
                
                // Update progress steps
                progressSteps.forEach((step, index) => {
                    if (index <= n) {
                        step.classList.add('active');
                        if (index < n) {
                            step.classList.add('completed');
                        } else {
                            step.classList.remove('completed');
                        }
                    } else {
                        step.classList.remove('active', 'completed');
                    }
                });
                
                // Update progress bar width
                const progressPercentage = (n / (steps.length - 1)) * 100;
                progressBar.style.width = progressPercentage + '%';
                
                // Update navigation buttons
                prevBtn.disabled = n === 0;
                nextBtn.style.display = n === steps.length - 1 ? 'none' : 'flex';
                submitBtn.style.display = n === steps.length - 1 ? 'block' : 'none';
                
                currentStep = n;
            }
            
            // Next button click
            nextBtn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    if (currentStep < steps.length - 1) {
                        updateStep(currentStep + 1);
                    }
                }
            });
            
            // Previous button click
            prevBtn.addEventListener('click', function() {
                if (currentStep > 0) {
                    updateStep(currentStep - 1);
                }
            });
            
            // Validate current step before proceeding
            function validateStep(stepIndex) {
                let isValid = true;
                
                if (stepIndex === 1) { // Step 2 validation
                    const fullname = document.getElementById('fullname').value;
                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;
                    
                    if (!fullname) {
                        alert('الرجاء إدخال الاسم الكامل');
                        isValid = false;
                    } else if (!email || !isValidEmail(email)) {
                        alert('الرجاء إدخال بريد إلكتروني صحيح');
                        isValid = false;
                    } else if (!password || password.length < 6) {
                        alert('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل');
                        isValid = false;
                    } else if (password !== confirmPassword) {
                        alert('كلمتا المرور غير متطابقتين');
                        isValid = false;
                    }
                } else if (stepIndex === 2) { // Step 3 validation
                    const checkboxes = document.querySelectorAll('#step3 input[type="checkbox"]');
                    let checkedCount = 0;
                    
                    checkboxes.forEach(checkbox => {
                        if (checkbox.checked) checkedCount++;
                    });
                    
                    if (checkedCount === 0) {
                        alert('الرجاء اختيار مجال تخصص واحد على الأقل');
                        isValid = false;
                    }
                }
                
                return isValid;
            }
            
            // Email validation
            function isValidEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            
            // File upload handling
            const idUploadArea = document.getElementById('idUploadArea');
            const idUpload = document.getElementById('idUpload');
            const idPreview = document.getElementById('idPreview');
            const selfieUploadArea = document.getElementById('selfieUploadArea');
            const selfieUpload = document.getElementById('selfieUpload');
            const selfiePreview = document.getElementById('selfiePreview');
            const checkmark = document.querySelector('.checkmark');
            
            // Handle ID upload
            idUploadArea.addEventListener('click', () => idUpload.click());
            idUpload.addEventListener('change', function(e) {
                if (e.target.files.length) {
                    const file = e.target.files[0];
                    
                    if (file.size > 5 * 1024 * 1024) {
                        alert('حجم الملف يجب أن يكون أقل من 5MB');
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        idPreview.innerHTML = `
                            <p>${file.name}</p>
                            <img src="${event.target.result}" alt="صورة الهوية">
                            <button class="btn-remove" id="removeId">إزالة</button>
                        `;
                        idPreview.style.display = 'block';
                        
                        document.getElementById('removeId').addEventListener('click', function() {
                            idPreview.style.display = 'none';
                            idUpload.value = '';
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Handle selfie upload
            selfieUploadArea.addEventListener('click', () => selfieUpload.click());
            selfieUpload.addEventListener('change', function(e) {
                if (e.target.files.length) {
                    const file = e.target.files[0];
                    
                    if (file.size > 5 * 1024 * 1024) {
                        alert('حجم الملف يجب أن يكون أقل من 5MB');
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        selfiePreview.innerHTML = `
                            <p>${file.name}</p>
                            <img src="${event.target.result}" alt="صورة السيلفي">
                            <button class="btn-remove" id="removeSelfie">إزالة</button>
                        `;
                        selfiePreview.style.display = 'block';
                        
                        document.getElementById('removeSelfie').addEventListener('click', function() {
                            selfiePreview.style.display = 'none';
                            selfieUpload.value = '';
                        });
                        
                        // Show animation
                        document.querySelector('.id-card').style.animation = 'pulse 1s';
                        document.querySelector('.selfie-card').style.animation = 'pulse 1s 0.5s';
                        checkmark.style.animation = 'checkmark 1s 1s forwards';
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Form submission
            const registerForm = document.getElementById('registerForm');
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!document.getElementById('terms').checked) {
                    alert('يجب الموافقة على شروط الخدمة وسياسة الخصوصية');
                    return;
                }
                
                if (!idUpload.files.length || !selfieUpload.files.length) {
                    alert('يجب رفع كلا المستندين لإثبات الهوية');
                    return;
                }
                
                const registerButton = registerForm.querySelector('.btn-register');
                registerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الحساب...';
                registerButton.disabled = true;
                
                // Simulate account creation
                setTimeout(() => {
                    registerButton.innerHTML = '<i class="fas fa-user-plus"></i> إنشاء حساب جديد';
                    registerButton.disabled = false;
                    
                    // Success message
                    alert('تم إنشاء حسابك بنجاح! سيتم تحويلك إلى لوحة التحكم.');
                    
                    // Redirect to dashboard
                    // window.location.href = 'dashboard.html';
                }, 2000);
            });
        });