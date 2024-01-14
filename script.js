//your JS code here. If required.
const images = document.querySelectorAll('img');
        const resetButton = document.getElementById('reset');
        const verifyButton = document.getElementById('verify');
        const para = document.getElementById('para');
        let clickedImages = [];

        // Shuffle the images on page reload
        function shuffleImages() {
            const imageContainer = document.getElementById('image-container');
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i].src, images[j].src] = [images[j].src, images[i].src];
            }
            images.forEach((image, index) => {
                imageContainer.appendChild(image);
                image.addEventListener('click', handleImageClick);
            });
        }

        shuffleImages();

        function handleImageClick(e) {
            const clickedImage = e.target;
            if (clickedImages.length === 2) {
                return; // Already clicked two images
            }

            clickedImage.classList.add('selected');
            clickedImages.push(clickedImage);

            if (clickedImages.length === 2) {
                resetButton.style.display = 'inline';
                verifyButton.style.display = 'inline';
            }

            if (clickedImages.length === 2 && areImagesIdentical()) {
                para.innerText = 'You are a human. Congratulations!';
            } else if (clickedImages.length === 2) {
                para.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
            }
        }

        function areImagesIdentical() {
            return clickedImages[0].src === clickedImages[1].src;
        }

        resetButton.addEventListener('click', () => {
            clickedImages.forEach((image) => image.classList.remove('selected'));
            clickedImages = [];
            resetButton.style.display = 'none';
            verifyButton.style.display = 'none';
            para.innerText = '';
        });

        verifyButton.addEventListener('click', () => {
            verifyButton.style.display = 'none';
        });