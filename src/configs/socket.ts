import { END_POINT } from "configs";
import { io } from "socket.io-client";
const URL = END_POINT.URL_SERVER ? END_POINT.URL_SERVER.toString() : "http://localhost:4000";
const socket = io(URL);
export default socket;
