import request from "./request";
export const getClassroomsByUser = (id) => {
  const response = request
    .get(`classroom/user/${id}`)
    .then((res) => {
      console.log("Danh sach cac classroom tra ve la ", res);
      if (res?.data?.success) {
        return res?.data?.data?.items;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getCheckinsByUserAndClassroom = (data) => {
  const resonse = request
    .post("checkins/classroom", data)
    .then((res) => {
    //   console.log(res);
      return (res?.data?.success == true) ? res?.data?.data?.items : null
    })
    .catch((err) => {
      console.log(err);
    });
  return resonse;
};


export const getQuantityQrByClassroomId = (id) =>{
    return request.get(`qr/quantity/${id}`);
}

export const getHistoryAttended = async(data)=>{
  const res =await request.post("checkins/user", data)
    return res?.data?.success ? res?.data?.data?.items : null
 
}