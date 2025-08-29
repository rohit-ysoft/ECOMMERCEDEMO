const pageContent = document.getElementById('page-content');

// Function to load page content into <main>
function loadPage(page) {
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then(html => { 
      pageContent.innerHTML = html;
      window.scrollTo(0, 0); // scroll top
      attachPageLinks();     // reattach links inside newly loaded HTML
    })
    .catch(err => {
      pageContent.innerHTML = "<p>Page not found.</p>";
      console.error(err);
    });
}

// Load index page by default
loadPage('/HTML/index.html');

// Function to attach event listeners to *all* links with data-page
function attachPageLinks() {
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
    });
  });
}

// Attach events on first load
attachPageLinks();
