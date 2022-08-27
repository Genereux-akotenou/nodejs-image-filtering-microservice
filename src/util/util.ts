import fs from "fs";
import Jimp = require("jimp");
import axios from 'axios';


// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file

// [FROM UDACITY CLOUD DEV SLACK FORUM, 27 August 2022]
// We change a this function because it do not work for some large image link. 
// So we use axios to read image before the traitment. the initial function is
// bellow with depreceded mention
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      .then(function ({data: imageBuffer}) {
        return Jimp.read(imageBuffer);
      });
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
        await photo
          .resize(256, 256)
          .quality(60)
          .greyscale()
          .write(__dirname + outpath, (img) => {
            resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// DEPRECATED
// export async function filterImageFromURL(inputURL: string): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const photo = await Jimp.read(inputURL);
//       const outpath =
//         "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
//       await photo
//         .resize(256, 256) // resize
//         .quality(60) // set JPEG quality
//         .greyscale() // set greyscale
//         .write(__dirname + outpath, (img) => {
//           resolve(__dirname + outpath);
//         });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// helper function to delete files on the local disk
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
