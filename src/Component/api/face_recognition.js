// import request from "./request"
// export const faceRecognition = (image) =>{
//    return  request.post('predict/',image)
    
// }

import request from "./request"
export const faceRecognition = (data) =>{
   return  request.post('face_recognition/',data)
    
}