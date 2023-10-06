export interface envInterface {
	api_url : string
}

const environment: envInterface = {
	api_url : process.env.API_URL || "http://localhost:5000/users/"
}

export default environment
