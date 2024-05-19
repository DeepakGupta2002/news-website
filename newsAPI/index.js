
// Function to fetch news from API
function fetchNews() {
    // Display loading spinner
    document.getElementById('loading-spinner').style.display = 'block';

    // Your News API key
    const apiKey = '7afe6f9fb42748c29ac70d394b96ca37';
    // URL for fetching news
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    // Fetch data from API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            document.getElementById('loading-spinner').style.display = 'none';

            // Display news headlines
            console.log(data.articles);
            const newsContainer = document.getElementById('news-container');
            const headlines = data.articles.map(article => {
                // Get image URL or use a placeholder if no image is available
                const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/150';
                return `<div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <img src="${imageUrl}" class="card-img-top" alt="...">
                            <p class="card-text">${article.description}</p>
                            <button class="btn btn-primary" onclick="showArticleDetails('${article.title}', '${article.description}', '${article.author}', '${imageUrl}', '${article.publishedAt}')">Show Details</button>
                        </div>
                    </div>`;
            });
            newsContainer.innerHTML = headlines.join('');
        })
        .catch(error => {
            // Hide loading spinner
            document.getElementById('loading-spinner').style.display = 'none';

            // Display error message
            console.error('Error fetching news:', error);
            alert('An error occurred while fetching news. Please try again later.');
        });
}

// Function to show article details
function showArticleDetails(title, description, author, imageUrl, publishedAt) {
    document.getElementById('article-title').innerText = title;
    document.getElementById('article-description').innerText = description;
    document.getElementById('article-author').innerText = author;
    document.getElementById('article-image').src = imageUrl;
    document.getElementById('article-published-at').innerText = publishedAt;
}

// Call fetchNews function when the page loads
window.onload = fetchNews;
