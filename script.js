// Fetch the JSON data and display banners
fetch('Comprehensive_HVIT_Definitions_with_Prefix.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Check if data is loaded correctly
        displayBanners(data);
    })
    .catch(error => console.error("Error loading JSON:", error));

// Function to display banners from JSON data
function displayBanners(data) {
    const container = document.getElementById('banner-container');

    data.forEach(item => {
        const banner = document.createElement('div');
        banner.classList.add('banner');
        
        // SVG structure for each banner
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
                <rect width="100%" height="100%" fill="#e3e3e3" />
                <text x="50%" y="30%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#333">
                    ${item.concept}
                </text>
                <foreignObject x="10" y="50" width="380" height="140">
                    <p xmlns="http://www.w3.org/1999/xhtml" style="color: #555; font-size: 14px;">
                        ${item.definition}
                    </p>
                </foreignObject>
            </svg>
        `;
        banner.innerHTML = svg;
        
        // Click event to zoom in on banner
        banner.addEventListener('click', () => toggleZoom(banner));

        container.appendChild(banner);
    });
}

// Function to toggle zoom on a banner
function toggleZoom(banner) {
    const overlay = document.querySelector('.overlay');
    banner.classList.toggle('zoomed');
    overlay.classList.toggle('show');

    // Close zoomed banner if overlay is clicked
    overlay.addEventListener('click', () => {
        banner.classList.remove('zoomed');
        overlay.classList.remove('show');
    });
}

// Create and add overlay element to the DOM
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);
