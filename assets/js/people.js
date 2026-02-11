// People page specific JavaScript

// Load PhD students from CSV
async function loadPhDStudents() {
    try {
        const response = await fetch('../data/people/phds.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length <= 1) return; // Only header, no data

        const grid = document.getElementById('phd-students-grid');
        grid.innerHTML = '';
        let hasEntries = false;

        // Parse all data rows (starting from row 1)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);

            // Skip if no firstName (empty row)
            if (!parts[0] || parts[0].length === 0) continue;

            hasEntries = true;
            const phd = {
                firstName: parts[0],
                lastName: parts[1],
                phDTitle: parts[2],
                biography: parts[3],
                scholarLink: parts[4],
                imagePath: parts[25]
            };

            const card = document.createElement('div');
            card.className = 'person-card';
            let avatarHTML = '';
            if (phd.imagePath && phd.imagePath.trim()) {
                // If path starts with assets/, prepend ../ for relative path from pages/ folder
                let imagePath = phd.imagePath.startsWith('assets/') ? '../' + phd.imagePath : phd.imagePath;
                avatarHTML = `<div class="person-avatar"><img src="${imagePath}" alt="${phd.firstName} ${phd.lastName}"></div>`;
            } else {
                avatarHTML = `<div class="person-avatar"><div class="image-placeholder">👤</div></div>`;
            }
            card.innerHTML = `
                ${avatarHTML}
                <h3>${phd.firstName} ${phd.lastName}</h3>
                <p class="person-role">PhD Researcher</p>
                <p class="person-bio">${phd.phDTitle}</p>
                <a href="profile.html?type=phd&id=${i}" class="publication-link">More about me →</a>
            `;
            grid.appendChild(card);
        }

        // Hide title if no entries
        const phdTitle = document.getElementById('phd-title');
        if (phdTitle) phdTitle.style.display = hasEntries ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading PhD students:', error);
    }
}

// Load PostDocs from CSV
async function loadPostDocs() {
    try {
        const response = await fetch('../data/people/postdocs.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length <= 1) return; // Only header, no data

        const grid = document.getElementById('postdocs-grid');
        grid.innerHTML = '';
        let hasEntries = false;

        // Parse all data rows (starting from row 1)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);

            // Skip if no firstName (empty row)
            if (!parts[0] || parts[0].length === 0) continue;

            hasEntries = true;
            const postdoc = {
                firstName: parts[0],
                lastName: parts[1],
                title: parts[2],
                biography: parts[3],
                imagePath: parts[25]
            };

            const card = document.createElement('div');
            card.className = 'person-card';
            let avatarHTML = '';
            if (postdoc.imagePath && postdoc.imagePath.trim()) {
                // If path starts with assets/, prepend ../ for relative path from pages/ folder
                let imagePath = postdoc.imagePath.startsWith('assets/') ? '../' + postdoc.imagePath : postdoc.imagePath;
                avatarHTML = `<div class="person-avatar"><img src="${imagePath}" alt="${postdoc.firstName} ${postdoc.lastName}"></div>`;
            } else {
                avatarHTML = `<div class="person-avatar"><div class="image-placeholder">👤</div></div>`;
            }
            card.innerHTML = `
                ${avatarHTML}
                <h3>${postdoc.firstName} ${postdoc.lastName}</h3>
                <p class="person-role">PostDoc / Research Fellow</p>
                <p class="person-bio">${postdoc.title}</p>
                <a href="profile.html?type=postdoc&id=${i}" class="publication-link">More about me →</a>
            `;
            grid.appendChild(card);
        }

        // Hide title if no entries
        const postdocTitle = document.getElementById('postdocs-title');
        if (postdocTitle) postdocTitle.style.display = hasEntries ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading PostDocs:', error);
    }
}

// Load Master Students from CSV
async function loadMasterStudents() {
    try {
        const response = await fetch('../data/people/masters.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length <= 1) return; // Only header, no data

        const grid = document.getElementById('masters-grid');
        grid.innerHTML = '';
        let hasEntries = false;

        // Parse all data rows (starting from row 1)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);

            // Skip if no firstName (empty row)
            if (!parts[0] || parts[0].length === 0) continue;

            hasEntries = true;
            const master = {
                firstName: parts[0],
                lastName: parts[1],
                title: parts[2],
                biography: parts[3],
                imagePath: parts[25]
            };

            const card = document.createElement('div');
            card.className = 'person-card';
            let avatarHTML = '';
            if (master.imagePath && master.imagePath.trim()) {
                // If path starts with assets/, prepend ../ for relative path from pages/ folder
                let imagePath = master.imagePath.startsWith('assets/') ? '../' + master.imagePath : master.imagePath;
                avatarHTML = `<div class="person-avatar"><img src="${imagePath}" alt="${master.firstName} ${master.lastName}"></div>`;
            } else {
                avatarHTML = `<div class="person-avatar"><div class="image-placeholder">👤</div></div>`;
            }
            card.innerHTML = `
                ${avatarHTML}
                <h3>${master.firstName} ${master.lastName}</h3>
                <p class="person-role">Master Student</p>
                <p class="person-bio">${master.title}</p>
                <a href="profile.html?type=master&id=${i}" class="publication-link">More about me →</a>
            `;
            grid.appendChild(card);
        }

        // Hide title if no entries
        const masterTitle = document.getElementById('masters-title');
        if (masterTitle) masterTitle.style.display = hasEntries ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading Master Students:', error);
    }
}

// Load Alumni from CSV
async function loadAlumni() {
    try {
        const response = await fetch('../data/people/alumni.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length <= 1) return; // Only header, no data

        const grid = document.getElementById('alumni-grid');
        grid.innerHTML = '';
        let hasEntries = false;

        // Parse all data rows (starting from row 1)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);

            // Skip if no firstName (empty row)
            if (!parts[0] || parts[0].length === 0) continue;

            hasEntries = true;
            const alumni = {
                firstName: parts[0],
                lastName: parts[1],
                title: parts[2],
                biography: parts[3],
                imagePath: parts[25]
            };

            const card = document.createElement('div');
            card.className = 'person-card';
            let avatarHTML = '';
            if (alumni.imagePath && alumni.imagePath.trim()) {
                // If path starts with assets/, prepend ../ for relative path from pages/ folder
                let imagePath = alumni.imagePath.startsWith('assets/') ? '../' + alumni.imagePath : alumni.imagePath;
                avatarHTML = `<div class="person-avatar"><img src="${imagePath}" alt="${alumni.firstName} ${alumni.lastName}"></div>`;
            } else {
                avatarHTML = `<div class="person-avatar"><div class="image-placeholder">👤</div></div>`;
            }
            card.innerHTML = `
                ${avatarHTML}
                <h3>${alumni.firstName} ${alumni.lastName}</h3>
                <p class="person-role">Alumni</p>
                <p class="person-bio">${alumni.title}</p>
                <a href="profile.html?type=alumni&id=${i}" class="publication-link">More about me →</a>
            `;
            grid.appendChild(card);
        }

        // Hide title if no entries
        const alumniTitle = document.getElementById('alumni-title');
        if (alumniTitle) alumniTitle.style.display = hasEntries ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading Alumni:', error);
    }
}

// Initialize people page
document.addEventListener('DOMContentLoaded', () => {
    initCommonElements('people');
    loadPhDStudents();
    loadPostDocs();
    loadMasterStudents();
    loadAlumni();
});
