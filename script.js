<script>
        // Page navigation functionality
        let currentPage = 0;
        const pages = ['home', 'about', 'skills', 'projects', 'internships', 'certifications', 'contact'];
        const totalPages = pages.length;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updatePageDisplay();
            setupNavigation();
            setupContactForm();
            addAnimations();
        });

        // Navigation functions
        function goToPage(pageIndex) {
            if (pageIndex >= 0 && pageIndex < totalPages) {
                currentPage = pageIndex;
                updatePageDisplay();
                updateURL();
                addPageTransition();
            }
        }

        function nextPage() {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updatePageDisplay();
                updateURL();
                addPageTransition();
            }
        }

        function previousPage() {
            if (currentPage > 0) {
                currentPage--;
                updatePageDisplay();
                updateURL();
                addPageTransition();
            }
        }

        function updatePageDisplay() {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show current page
            document.getElementById(pages[currentPage]).classList.add('active');

            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[href="#${pages[currentPage]}"]`).classList.add('active');

            // Update page indicators
            document.querySelectorAll('.page-btn').forEach((btn, index) => {
                btn.classList.toggle('active', index === currentPage);
            });

            // Update navigation arrows visibility
            document.querySelector('.page-nav.prev').style.opacity = currentPage === 0 ? '0.5' : '1';
            document.querySelector('.page-nav.next').style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
        }

        // Removed 3D page flip logic; simple navigation only

        function updateURL() {
            history.pushState(null, null, `#${pages[currentPage]}`);
        }

        function addPageTransition() {
            // Disabled shake/tilt effect for notebook theme
        }

        // Setup navigation event listeners
        function setupNavigation() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetPage = this.getAttribute('href').substring(1);
                    const pageIndex = pages.indexOf(targetPage);
                    if (pageIndex !== -1) {
                        goToPage(pageIndex);
                    }
                });
            });

            // Handle browser back/forward buttons
            window.addEventListener('popstate', function() {
                const hash = window.location.hash.substring(1);
                const pageIndex = pages.indexOf(hash);
                if (pageIndex !== -1) {
                    currentPage = pageIndex;
                    updatePageDisplay();
                }
            });

            // Set initial page based on URL hash
            const initialHash = window.location.hash.substring(1);
            const initialPageIndex = pages.indexOf(initialHash);
            if (initialPageIndex !== -1) {
                currentPage = initialPageIndex;
                updatePageDisplay();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                previousPage();
            } else if (e.key === 'ArrowRight') {
                nextPage();
            } else if (e.key >= '1' && e.key <= '7') {
                goToPage(parseInt(e.key) - 1);
            }
        });

        // Contact form functionality
        function setupContactForm() {
            document.getElementById('contactForm').addEventListener('submit', function() {
                // Allow normal submission to Formspree and show quick feedback
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i>Sending...';
                submitBtn.disabled = true;
                const formRef = this;
                // Clear the form shortly after submit so it doesn't interfere with the outgoing request
                setTimeout(() => {
                    formRef.reset();
                    sessionStorage.removeItem('contactFormData');
                }, 600);
            });
        }

        // Profile button functionality
        function showProfile() {
            const profileData = {
                name: "Kumara Vamsi",
                title: "Web Developer",
                experience: "Fresher",
                location: "Bhimavaram, India",
                email: "kvamsisirigineedi@gmail.com",
                phone: "+91 8341384071",
                skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Python"],
                languages: ["English", "Telugu", "Hindi"]
            };

            const profileWindow = window.open('', '_blank', 'width=500,height=600,scrollbars=yes');
            profileWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Profile - ${profileData.name}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: Arial, sans-serif; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 20px; 
                            min-height: 100vh;
                        }
                        .profile-container { 
                            background: white; 
                            border-radius: 20px; 
                            padding: 30px; 
                            max-width: 400px; 
                            margin: 0 auto;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                        }
                        .profile-header { text-align: center; margin-bottom: 30px; }
                        .profile-avatar { 
                            width: 100px; height: 100px; border-radius: 50%; 
                            background: linear-gradient(45deg, #3b82f6, #06b6d4); 
                            margin: 0 auto 20px; display: flex; align-items: center; 
                            justify-content: center; color: white; font-size: 40px;
                        }
                        h1 { color: #1e293b; margin-bottom: 5px; }
                        .title { color: #06b6d4; font-size: 18px; margin-bottom: 15px; }
                        .info-grid { display: grid; gap: 15px; }
                        .info-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f8fafc; border-radius: 10px; }
                        .info-icon { width: 30px; height: 30px; background: linear-gradient(45deg, #3b82f6, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; }
                        .skills { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
                        .skill-tag { background: linear-gradient(45deg, #3b82f6, #06b6d4); color: white; padding: 4px 8px; border-radius: 10px; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="profile-container">
                        <div class="profile-header">
                            <div class="profile-avatar">KV</div>
                            <h1>${profileData.name}</h1>
                            <div class="title">${profileData.title}</div>
                        </div>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">📧</div>
                                <div>
                                    <strong>Email:</strong><br>
                                    ${profileData.email}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">📱</div>
                                <div>
                                    <strong>Phone:</strong><br>
                                    ${profileData.phone}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">📍</div>
                                <div>
                                    <strong>Location:</strong><br>
                                    ${profileData.location}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">⚡</div>
                                <div>
                                    <strong>Experience:</strong><br>
                                    ${profileData.experience}
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">🛠️</div>
                                <div>
                                    <strong>Top Skills:</strong>
                                    <div class="skills">
                                        ${profileData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">🌐</div>
                                <div>
                                    <strong>Languages:</strong><br>
                                    ${profileData.languages.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed; top: 20px; right: 20px; z-index: 9999;
                background: ${type === 'success' ? 'linear-gradient(45deg, #10b981, #059669)' : 'linear-gradient(45deg, #3b82f6, #06b6d4)'};
                color: white; padding: 15px 25px; border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3); font-weight: 500;
                transform: translateX(100%); transition: all 0.3s ease;
                max-width: 300px; word-wrap: break-word;
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 4000);
        }

        // Add animations and interactions
        function addAnimations() {

            // Hover effects for skill items
            document.querySelectorAll('.skill-item').forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Typing animation for home page
            const homeTitle = document.querySelector('#home h1');
            if (homeTitle) {
                const originalText = homeTitle.textContent;
                homeTitle.textContent = '';
                let i = 0;
                const typeWriter = () => {
                    if (i < originalText.length) {
                        homeTitle.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                setTimeout(typeWriter, 1000);
            }

            // Floating animation disabled for notebook stability

            // Add ripple effect to buttons
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const ripple = document.createElement('span');
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3);
                        transform: scale(0); animation: ripple 0.6s linear;
                        left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Add CSS animation for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Misc setups and safe event bindings
        function setupMisc() {
            // Auto-save and restore contact form data
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                const formInputs = contactForm.querySelectorAll('input, textarea');
                formInputs.forEach(input => {
                    input.addEventListener('input', function() {
                        const formData = {};
                        formInputs.forEach(field => {
                            formData[field.name] = field.value;
                        });
                        sessionStorage.setItem('contactFormData', JSON.stringify(formData));
                    });
                });

                const savedFormData = sessionStorage.getItem('contactFormData');
                if (savedFormData) {
                    const data = JSON.parse(savedFormData);
                    formInputs.forEach(input => {
                        if (data[input.name]) {
                            input.value = data[input.name];
                        }
                    });
                }

                contactForm.addEventListener('submit', function() {
                    setTimeout(() => {
                        sessionStorage.removeItem('contactFormData');
                    }, 3500);
                });
            }

            // Mouse parallax disabled for notebook stability

            // Social links: allow normal navigation (no JS blocker)

            // Download CV demo handler
            const cvBtn = document.querySelector('.home-content .btn-primary[href="#"]');
            if (cvBtn) {
                cvBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Download CV functionality is not implemented in this demo. In a real portfolio, this would download your CV file.');
                });
            }

            // Project buttons: allow real links, warn only for placeholders
            document.querySelectorAll('.projects-grid .btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (!href || href === '#') {
                        e.preventDefault();
                        const projectName = this.textContent.trim();
                        alert(projectName + ' link not set yet.');
                        return;
                    }
                    // Open external links in a new tab
                    if (/^https?:\/\//i.test(href)) {
                        this.setAttribute('target', '_blank');
                        this.setAttribute('rel', 'noopener');
                    }
                });
            });
        }

        // Extend initialization to include misc setups
        document.addEventListener('DOMContentLoaded', function() {
            setupMisc();
        });
    </script>
