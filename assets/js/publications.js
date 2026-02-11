// Publications page specific JavaScript

// Load and parse publications from CSV
async function loadPublications() {
    try {
        // Load journal articles
        const journalResponse = await fetch('../data/publications/journals.csv');
        const journalText = await journalResponse.text();
        const journalLines = journalText.trim().split('\n');

        const journalArticles = [];
        // Parse journal articles CSV (skip header)
        for (let i = 1; i < journalLines.length; i++) {
            const line = journalLines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);
            if (parts.length >= 5) {
                journalArticles.push({
                    title: parts[0],
                    authors: parts[1],
                    journal: parts[2],
                    year: parts[3],
                    doi: parts[4],
                    type: 'journal'
                });
            }
        }

        // Load conference papers
        const confResponse = await fetch('../data/publications/conferences.csv');
        const confText = await confResponse.text();
        const confLines = confText.trim().split('\n');

        const conferencePapers = [];
        // Parse conference papers CSV (skip header)
        for (let i = 1; i < confLines.length; i++) {
            const line = confLines[i].trim();
            if (!line) continue;

            const parts = parseCSVLine(line);
            if (parts.length >= 4) {
                conferencePapers.push({
                    title: parts[0],
                    authors: parts[1],
                    conference: parts[2],
                    year: parts[3],
                    link: parts[4],
                    type: 'conference'
                });
            }
        }

        // Populate journal articles (latest 5)
        const journalList = document.getElementById('journalList');
        if (journalList && journalArticles.length > 0) {
            journalList.innerHTML = '';
            const latestJournal = journalArticles.slice(0, 5);
            latestJournal.forEach(pub => populatePublication(pub, journalList));
        }

        // Populate conference papers (latest 5)
        const conferenceList = document.getElementById('conferenceList');
        if (conferenceList && conferencePapers.length > 0) {
            conferenceList.innerHTML = '';
            const latestConf = conferencePapers.slice(0, 5);
            latestConf.forEach(pub => populatePublication(pub, conferenceList));
        }

        // For full listing pages
        const allJournalList = document.getElementById('allJournalList');
        if (allJournalList && journalArticles.length > 0) {
            allJournalList.innerHTML = '';
            journalArticles.forEach(pub => populatePublication(pub, allJournalList));
        }

        const allConferenceList = document.getElementById('allConferenceList');
        if (allConferenceList && conferencePapers.length > 0) {
            allConferenceList.innerHTML = '';
            conferencePapers.forEach(pub => populatePublication(pub, allConferenceList));
        }
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Helper function to create and populate a publication item
function populatePublication(pub, container) {
    let pubInfo = '';
    let link = '';

    if (pub.type === 'journal') {
        pubInfo = `<strong>${pub.journal}</strong>, ${pub.year}`;
        link = pub.doi;
    } else if (pub.type === 'conference') {
        pubInfo = `<strong>${pub.conference}</strong>, ${pub.year}`;
        link = pub.link;
    }

    const article = document.createElement('article');
    article.className = 'publication-item';
    article.innerHTML = `
        <h3>${pub.title}</h3>
        <p class="publication-authors">${pub.authors}</p>
        <p class="publication-journal">${pubInfo}</p>
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="publication-link">Read More →</a>
    `;
    container.appendChild(article);
}

// Initialize publications page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    let activePage = 'publications';

    if (currentPage.includes('journal_articles')) {
        activePage = 'publications';
    } else if (currentPage.includes('conference_papers')) {
        activePage = 'publications';
    }

    initCommonElements(activePage);
    loadPublications();
});
