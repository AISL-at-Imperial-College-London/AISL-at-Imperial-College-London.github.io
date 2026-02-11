// Common JavaScript utilities shared across all pages

// CSV parser that handles quoted fields with commas
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++;
            } else {
                // Toggle quote state
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // End of field
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    // Add last field
    result.push(current.trim());
    return result;
}

// Generate navbar HTML
function generateNavbar(activePage = '') {
    const basePath = window.location.pathname.includes('/pages/') ? '../' : '';

    return `
        <nav class="navbar">
            <div class="nav-container">
                <a href="${basePath}index.html" class="nav-logo">
                    <img src="${basePath}assets/images/logos/logo_1.png?v=2" alt="AISL Logo" class="logo-image">
                    <img src="${basePath}assets/images/logos/imperial_dep.png" alt="Chemical Engineering Logo" class="logo-image">
                </a>
                <ul class="nav-menu">
                    <li><a href="${basePath}index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
                    <li><a href="${basePath}pages/blog.html" class="nav-link ${activePage === 'blog' ? 'active' : ''}">Blog</a></li>
                    <li><a href="${basePath}pages/people.html" class="nav-link ${activePage === 'people' ? 'active' : ''}">People</a></li>
                    <li><a href="${basePath}pages/publications.html" class="nav-link ${activePage === 'publications' ? 'active' : ''}">Publications</a></li>
                    <li><a href="${basePath}pages/contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
                    <li><a href="https://github.com/AISL-at-Imperial-College-London" class="nav-link nav-icon" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a></li>
                </ul>
            </div>
        </nav>
    `;
}

// Generate footer HTML
function generateFooter() {
    return `
        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2026 Autonomous Industrial Systems Lab. All rights reserved.</p>
            </div>
        </footer>
    `;
}

// Initialize navbar and footer
function initCommonElements(activePage = '') {
    // Insert navbar at the beginning of body
    const navbarHTML = generateNavbar(activePage);
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Insert footer at the end of body
    const footerHTML = generateFooter();
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}
