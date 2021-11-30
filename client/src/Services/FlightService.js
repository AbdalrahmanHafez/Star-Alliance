import http from "./http-common";

class FlightService {
  updateFlight(data) {
    return http.post("/Admin/UpdateFlight", data);
  }
  updateUser(data) {
    return http.post("/Admin/UpdateUser", data);
  }
  GetFlightInfo(data) {
    return http.post("/Admin/GetFlightInfo", data);
  }
  GetInfo(data) {
    return http.post("/Admin/GetInfo", data); 
  } 
  GetUserInfo(data) {
    return http.post("/Admin/GetUserInfo", data); 
  } 
  GetAllFlights(data) {
    return http.get("/Admin/GetAllFlights"); 
  }
  GetAllReservedFlights(data) {
    return http.get("/Admin/GetAllReservedFlights"); 
  }
  DeleteFlight(data, resp) {
    return http.post("/Admin/DeleteFlight", data, resp);
  }
  CancelReservation(data, resp) {
    return http.post("/Admin/CancelReservation", data, resp);
  }
  GetRequestedFlights(data) {
    return http.post("/Admin/GetRequestedFlights",data); 
  }

}

export default new FlightService();
