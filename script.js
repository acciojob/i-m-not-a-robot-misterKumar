//your JS code here. If required.
// Fetch the list of image URLs from an API
const fetchImageURLs = () => {
  // Replace 'apiEndpoint' with the actual API endpoint that provides the image URLs
  return fetch('apiEndpoint')
    .then(response => response.json())
    .then(data => data.urls);
};

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get a random index from 0 to max (exclusive)
const getRandomIndex = max => Math.floor(Math.random() * max);

// Generate a random number between min and max (inclusive)
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Update the image URLs and class names
const updateImages = () => {
  fetchImageURLs()
    .then(urls => {
      // Shuffle the URLs
      const shuffledURLs = shuffleArray(urls);
      
      // Randomly choose a repeated image index
      const repeatedIndex = getRandomIndex(5);
      
      // Clone the array and insert the repeated image
      const imageURLs = [...shuffledURLs];
      imageURLs.splice(getRandomNumber(0, 5), 0, shuffledURLs[repeatedIndex]);
      
      const imageElements = document.querySelectorAll('#image-container img');
      imageElements.forEach((img, index) => {
        img.src = imageURLs[index];
        img.addEventListener('click', handleImageClick);
      });
    });
};

// Handle image click event
let selectedImages = [];
let verifyButtonClicked = false;

const handleImageClick = event => {
  const clickedImage = event.target;
  
  if (selectedImages.length === 2 || verifyButtonClicked) {
    return; // Ignore clicks when two images are already selected or when verify button is clicked
  }
  
  clickedImage.classList.add('selected');
  selectedImages.push(clickedImage);
  
  if (selectedImages.length === 1) {
    document.getElementById('reset').style.display = 'inline-block';
  } else if (selectedImages.length === 2) {
    document.getElementById('verify').style.display = 'inline-block';
  }
  
  if (selectedImages.length === 2) {
    const [image1, image2] = selectedImages;
    
    if (image1.src === image2.src) {
      document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
      document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  }
};

// Handle reset button click event
const handleResetClick = () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  verifyButtonClicked = false;
  document.getElementById('reset').style.display = 'none';
  document.getElementById('verify').style.display = 'none';
  document.getElementById('para').textContent = '';
};

// Handle verify button click event
const handleVerifyClick = () => {
  verifyButtonClicked = true;
  document.getElementById('verify').style.display = 'none';
};

// Attach event listeners to buttons
document.getElementById('reset').addEventListener('click', handleResetClick);
document.getElementById('verify').addEventListener('click', handleVerifyClick);

// Initialize the app
updateImages();
