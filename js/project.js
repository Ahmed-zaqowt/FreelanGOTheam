     document.addEventListener("DOMContentLoaded", () => {
            const searchInput = document.getElementById("search");
            const categorySelect = document.getElementById("category");
            const budgetMin = document.getElementById("budgetMin");
            const budgetMax = document.getElementById("budgetMax");
            const durationSelect = document.getElementById("duration");
            const filterBtn = document.querySelector(".btn-filter");
            const resetBtn = document.querySelector(".reset-btn");
            const projectsList = document.getElementById("projectsList");
            const sortSelect = document.getElementById("sort");
            
            // Project data
            const projects = [
                {
                    title: "تصميم واجهة متجر إلكتروني",
                    desc: "نبحث عن مصمم محترف لإنشاء واجهة متجر متجاوبة باستخدام Figma أو Adobe XD. يجب أن تكون التصاميم عصرية وتواكب أحدث اتجاهات UI/UX.",
                    budgetMin: 300,
                    budgetMax: 500,
                    duration: 5,
                    category: "تصميم جرافيك",
                    bids: 3
                },
                {
                    title: "تطوير API لنظام حجوزات",
                    desc: "مطلوب مبرمج Laravel لتطوير API كامل لنظام حجوزات طبي مع دعم نظام دفع إلكتروني وتكامل مع Google Calendar. الخبرة السابقة في مشاريع مشابهة مطلوبة.",
                    budgetMin: 500,
                    budgetMax: 800,
                    duration: 10,
                    category: "برمجة وتطوير",
                    bids: 8
                },
                {
                    title: "ترجمة موقع إلكتروني",
                    desc: "ترجمة محتوى موقع من العربية إلى الإنجليزية (حوالي 5000 كلمة) مع التدقيق اللغوي وضمان الجودة. يجب أن يكون المترجم متخصص في المجال التقني.",
                    budgetMin: 150,
                    budgetMax: 250,
                    duration: 3,
                    category: "كتابة وترجمة",
                    bids: 12
                },
                {
                    title: "حملة تسويقية على السوشيال ميديا",
                    desc: "مطلوب مسوق إلكتروني لتنفيذ حملة تسويقية لمنتج جديد على منصات التواصل الاجتماعي (فيسبوك، إنستغرام، تويتر). يشمل التخطيط، التنفيذ، والمتابعة.",
                    budgetMin: 400,
                    budgetMax: 600,
                    duration: 7,
                    category: "تسويق إلكتروني",
                    bids: 5
                },
                {
                    title: "مونتاج فيديو ترويجي",
                    desc: "مطلوب محرر فيديو محترف لإنشاء فيديو ترويجي مدته 60-90 ثانية من مواد خام موجودة. يجب أن يشمل المؤثرات البصرية، الرسوم المتحركة، والموسيقى التصويرية.",
                    budgetMin: 200,
                    budgetMax: 350,
                    duration: 4,
                    category: "تصميم صوت وفيديو",
                    bids: 7
                }
            ];
            
            // Render projects
            const renderProjects = (projectsToRender = projects) => {
                projectsList.innerHTML = "";
                
                if (projectsToRender.length === 0) {
                    projectsList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-search"></i>
                            <h3>لم يتم العثور على مشاريع</h3>
                            <p>لا توجد مشاريع تطابق معايير البحث المحددة. حاول تغيير الفلاتر.</p>
                        </div>
                    `;
                    return;
                }
                
                projectsToRender.forEach(proj => {
                    const card = document.createElement("div");
                    card.classList.add("project-card");
                    card.innerHTML = `
                        <h2><i class="fas ${getCategoryIcon(proj.category)}"></i> ${proj.title}</h2>
                        <p class="project-desc">${proj.desc}</p>
                        <div class="project-meta">
                            <div class="meta-item"><i class="fas fa-money-bill"></i> ${proj.budgetMin}$ - ${proj.budgetMax}$</div>
                            <div class="meta-item"><i class="fas fa-clock"></i> ${proj.duration} أيام</div>
                            <div class="meta-item"><i class="fas fa-briefcase"></i> ${proj.bids} عروض</div>
                        </div>
                        <div class="project-footer">
                            <span class="project-category">${proj.category}</span>
                            <button class="btn-apply"><i class="fas fa-paper-plane"></i> تقديم عرض</button>
                        </div>
                    `;
                    projectsList.appendChild(card);
                });
            };
            
            // Get icon based on category
            const getCategoryIcon = (category) => {
                const icons = {
                    "برمجة وتطوير": "fa-code",
                    "تصميم جرافيك": "fa-paint-brush",
                    "كتابة وترجمة": "fa-language",
                    "تسويق إلكتروني": "fa-bullhorn",
                    "تصميم صوت وفيديو": "fa-video"
                };
                return icons[category] || "fa-folder";
            };
            
            // Filter projects
            const filterProjects = () => {
                const keyword = searchInput.value.toLowerCase();
                const category = categorySelect.value;
                const min = parseInt(budgetMin.value) || 0;
                const max = parseInt(budgetMax.value) || Infinity;
                const duration = durationSelect.value;
                
                const filtered = projects.filter(proj => {
                    const matchesKeyword = proj.title.toLowerCase().includes(keyword) || 
                                          proj.desc.toLowerCase().includes(keyword);
                    const matchesCategory = category === "الكل" || proj.category === category;
                    const matchesBudget = proj.budgetMin >= min && proj.budgetMax <= max;
                    const matchesDuration = duration === "الكل" || 
                                          (duration === "أقل من 3 أيام" && proj.duration < 3) ||
                                          (duration === "3 - 7 أيام" && proj.duration >= 3 && proj.duration <= 7) ||
                                          (duration === "أسبوع - أسبوعين" && proj.duration > 7 && proj.duration <= 14) ||
                                          (duration === "أكثر من أسبوعين" && proj.duration > 14);
                    
                    return matchesKeyword && matchesCategory && matchesBudget && matchesDuration;
                });
                
                renderProjects(filtered);
            };
            
            // Reset filters
            const resetFilters = () => {
                searchInput.value = "";
                categorySelect.value = "الكل";
                budgetMin.value = "";
                budgetMax.value = "";
                durationSelect.value = "الكل";
                renderProjects();
            };
            
            // Event listeners
            searchInput.addEventListener("input", filterProjects);
            filterBtn.addEventListener("click", filterProjects);
            resetBtn.addEventListener("click", resetFilters);
            sortSelect.addEventListener("change", filterProjects);
            
            // Initialize
            renderProjects();
            
            // Add hover effect to project cards
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                });
            });
        });