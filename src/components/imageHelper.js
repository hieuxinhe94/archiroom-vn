/**
 * @url - Source of the image to use
 * @aspectRatio - The aspect ratio to apply
 */
export const ImageCrop = (url,  outputDefaultWidth, outputDefaultHeight, aspectRatio) => {
	
	return new Promise(resolve => {

		// this image will hold our source image data
		const inputImage = new Image();

		// we want to wait for our image to load
		inputImage.onload = () => {

            
            

			// let's store the width and height of our image
			const inputWidth = inputImage.naturalWidth;
			const inputHeight = inputImage.naturalHeight;

			// get the aspect ratio of the input image
			const inputImageAspectRatio = inputWidth / inputHeight;

          

			// if it's bigger than our target aspect ratio
			let outputWidth = outputDefaultWidth ?? outputWidth;
			let outputHeight = outputDefaultHeight ?? outputHeight;
			// if (inputImageAspectRatio > aspectRatio) {
			// 	outputWidth = inputHeight * aspectRatio;
			// } else if (inputImageAspectRatio < aspectRatio) {
			// 	outputHeight = inputWidth / aspectRatio;
			// }

            // Set scale to fit image to canvas, 
            const scale = Math.min(outputWidth/inputWidth, outputHeight/inputHeight);
            
            

			// calculate the position to draw the image at
			const outputX = (outputWidth - inputWidth) * scale;
			const outputY = (outputHeight - inputHeight) * scale;

			// create a canvas that will present the output image
			const outputImage = document.createElement('canvas');

			// set it to the same size as the image
			outputImage.width = outputWidth;
			outputImage.height = outputHeight;

            outputImage.hidden = true;


            
            
 
			// draw our image at position 0, 0 on the canvas
			const ctx = outputImage.getContext('2d');
			ctx.drawImage(inputImage,  outputX, outputY);

           
			resolve(outputImage);
		};

		// start loading our image
		inputImage.src = url;
	});
	
};