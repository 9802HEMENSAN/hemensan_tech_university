document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper carousel with optimized settings
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 25
            }
        },
        loop: true, // Enable continuous loop
        autoplay: {
            delay: 5000, // Auto-rotate every 5 seconds
            disableOnInteraction: false
        }
    });

    // Get all placement data and unique programmes
    const allPlacements = Storage.getPlacements();
    const programmes = Storage.getProgrammes();
    
    // Populate branch select dropdown
    const branchSelect = document.getElementById('branchSelect');
    programmes.forEach(programme => {
        const option = document.createElement('option');
        option.value = programme;
        option.textContent = getProgrammeName(programme);
        branchSelect.appendChild(option);
    });
    
    // Initial render with all placements
    renderPlacements('all');
    
    // Add event listener for branch selection
    branchSelect.addEventListener('change', function() {
        renderPlacements(this.value);
    });
    
    function renderPlacements(selectedBranch) {
        const placementsWrapper = document.getElementById('placementsWrapper');
        placementsWrapper.innerHTML = '';
        
        // Filter placements if a specific branch is selected
        const filteredPlacements = selectedBranch === 'all' 
            ? allPlacements 
            : allPlacements.filter(p => p.programme === selectedBranch);
        
        if (filteredPlacements.length === 0) {
            placementsWrapper.innerHTML = `
                <div class="swiper-slide">
                    <div class="no-placements">
                        <span class="material-icons">info</span>
                        <p>No placement records found for the selected branch</p>
                    </div>
                </div>
            `;
            return;
        }
        
        // Create placement cards with optimized image handling
        filteredPlacements.forEach(placement => {
            const placementCard = document.createElement('div');
            placementCard.className = 'swiper-slide';
            
            // Set default image if not specified
            const studentImg = placement.studentImage || 'default-student.jpg';
            const companyImg = placement.companyLogo || 'default-company.png';
            
            placementCard.innerHTML = `
                <div class="placement-card">
                    <div class="student-profile">
                        <img src="images/students/${studentImg}" 
                             alt="${placement.name}" 
                             class="student-image"
                             loading="lazy"
                             width="200"
                             height="100">
                        <img src="images/companies/${companyImg}" 
                             alt="${placement.company}" 
                             class="company-logo"
                             loading="lazy"
                             width="70"
                             height="70">
                    </div>
                    <div class="placement-details">
                        <h3 class="student-name">${placement.name}</h3>
                        <p class="programme-name">${getProgrammeName(placement.programme)} (${placement.year})</p>
                        <div class="placement-info">
                            <span class="company-name">${placement.company}</span>
                            <span class="position">${placement.position}</span>
                        </div>
                        <div class="package">Package: ₹${placement.package} LPA</div>
                    </div>
                </div>
            `;
            
            placementsWrapper.appendChild(placementCard);
        });
        
        // Update Swiper after content changes
        swiper.update();
    }
    
    function getProgrammeName(code) {
        const names = {
            'BTech-CS': 'B.Tech Computer Science',
            'BTech-EE': 'B.Tech Electrical Engineering',
            'BSc-Math': 'B.Sc Mathematics',
            'BBA': 'Bachelor of Business Administration'
        };
        return names[code] || code;
    }
});