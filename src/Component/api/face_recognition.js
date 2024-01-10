import request from "./request"
export const faceRecognition = (image) =>{
   return  request.post('predict/',image)
    
}