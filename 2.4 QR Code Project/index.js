/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message : "What is your url?",
        name: "URL",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    // Generate a QR code for the text "Hello, world!"
    const qrCode = qr.image(answers.URL, { type: 'png' });

    // Save the QR code image to a file
    qrCode.pipe(fs.createWriteStream('URL.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });