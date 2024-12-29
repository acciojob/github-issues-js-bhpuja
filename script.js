//your code here
const issuesList = document.getElementById("issues-list");
const pageNumberElement = document.getElementById("page-number");
const loadPrevButton = document.getElementById("load_prev");
const loadNextButton = document.getElementById("load_next");

let currentPage = 1;

// Function to fetch and display issues
async function fetchIssues(page) {
    const url = `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching issues: ${response.statusText}`);
        }
        const issues = await response.json();

        // Clear the list before adding new issues
        issuesList.innerHTML = "";

        // Populate the list with issue titles
        if (issues.length === 0) {
            issuesList.innerHTML = "<li>No issues found for this page.</li>";
        } else {
            issues.forEach((issue) => {
                const listItem = document.createElement("li");
                listItem.textContent = issue.title;
                issuesList.appendChild(listItem);
            });
        }

        // Update page number
        pageNumberElement.textContent = `Page Number: ${page}`;

        // Enable/disable buttons
        loadPrevButton.disabled = page === 1;
    } catch (error) {
        console.error(error);
        issuesList.innerHTML = "<li>Error fetching issues. Please try again later.</li>";
    }
}

// Event listeners for buttons
loadPrevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchIssues(currentPage);
    }
});

loadNextButton.addEventListener("click", () => {
    currentPage++;
    fetchIssues(currentPage);
});

// Initial fetch
fetchIssues(currentPage);
