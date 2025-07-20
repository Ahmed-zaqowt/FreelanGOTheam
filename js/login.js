  document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // رسالة تحميل
                const loginButton = loginForm.querySelector('.btn-login');
                loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
                loginButton.disabled = true;
                
                // محاكاة عملية تسجيل الدخول
                setTimeout(() => {
                    // يمكنك هنا إضافة منطق تسجيل الدخول الفعلي
                    alert(`تم تسجيل الدخول بنجاح!\nالبريد: ${email}`);
                    
                    // إعادة الزر إلى حالته الأصلية
                    loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
                    loginButton.disabled = false;
                    
                    // توجيه المستخدم إلى صفحة أخرى
                    // window.location.href = 'dashboard.html';
                }, 1500);
            });
            
            // تأثيرات الأزرار الاجتماعية
            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const type = this.classList.contains('google') ? 'جوجل' : 
                                this.classList.contains('facebook') ? 'فيسبوك' : 'تويتر';
                    alert(`تم اختيار تسجيل الدخول عبر ${type}`);
                });
            });
        });