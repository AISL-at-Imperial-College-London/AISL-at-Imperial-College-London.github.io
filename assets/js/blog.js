// Blog page specific JavaScript

// Load blog posts from CSV
async function loadBlog() {
    try {
        const response = await fetch('../data/blog/blog.csv');
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');

        if (lines.length <= 1) return; // Only header, no data

        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';

        // Parse all data rows (starting from row 1)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);

            // Skip if no title (empty row)
            if (!parts[0] || parts[0].length === 0) continue;

            // CSV columns: Title, Date, Description, Image, Link
            const newsItem = {
                title: parts[0],
                date: parts[1],
                description: parts[2],
                image: parts[3],
                link: parts[4]
            };

            const newsCard = document.createElement('div');
            newsCard.className = 'news-item';

            let imageHTML = '';
            if (newsItem.image && newsItem.image.trim()) {
                // If path starts with assets/, prepend ../ for relative path from pages/ folder
                let imagePath = newsItem.image.startsWith('assets/') ? '../' + newsItem.image : newsItem.image;
                imageHTML = `<img src="${imagePath}" alt="${newsItem.title}" class="news-image">`;
            }

            let linkHTML = '';
            if (newsItem.link && newsItem.link.trim()) {
                linkHTML = `<a href="${newsItem.link}" class="news-link" target="_blank">Read more →</a>`;
            }

            newsCard.innerHTML = `
                ${imageHTML}
                <div class="news-content">
                    <h3>${newsItem.title}</h3>
                    <p class="news-date">${newsItem.date}</p>
                    <p>${newsItem.description}</p>
                    ${linkHTML}
                </div>
            `;
            newsList.appendChild(newsCard);
        }
    } catch (error) {
        console.error('Error loading blog:', error);
    }
}

// Initialize blog page
document.addEventListener('DOMContentLoaded', () => {
    initCommonElements('blog');
    loadBlog();
});
