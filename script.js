const generateBtn = document.getElementById('generateBtn');
const imageContainer = document.getElementById('imageContainer');
const gallery = document.getElementById('gallery');

const generatedImages = [];

generateBtn.addEventListener('click', () => {
    const prompt = document.getElementById('promptInput').value.trim();
    if(!prompt) {
        imageContainer.innerHTML = "<p>Please enter a prompt!</p>";
        return;
    }

    // Generate Unsplash URL based on prompt
    const imageUrl = `https://source.unsplash.com/500x300/?${encodeURIComponent(prompt)}`;

    // Display main image
    imageContainer.innerHTML = `
        <img src="${imageUrl}" alt="Generated Image">
        <br>
        <button class="download-btn" onclick="downloadImage('${imageUrl}')">Download Image</button>
    `;

    // Add to gallery
    generatedImages.unshift(imageUrl); // newest first
    updateGallery();
});

function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function updateGallery() {
    gallery.innerHTML = '';
    generatedImages.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "Generated Image";
        img.onclick = () => {
            imageContainer.innerHTML = `
                <img src="${url}" alt="Generated Image">
                <br>
                <button class="download-btn" onclick="downloadImage('${url}')">Download Image</button>
            `;
        };
        gallery.appendChild(img);
    });
}