import { EndPointProps } from "types";

const END_POINT: EndPointProps = {
	URL_SERVER: process.env.REACT_APP_BACKEND_URL,
	API_ENDPOINT: process.env.REACT_APP_BACKEND_URL + "/api"
};
export default END_POINT;
