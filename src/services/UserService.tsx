import axios, {AxiosError, Method} from "axios"
import environment                 from "../environment"
import {Component, createContext}  from "react"

export interface User {
	id        : string
	firstName : string
	lastName  : string
	email     : string

}

interface UserContextType {
	users      : User[]
	login      : (email: string, password: string) => Promise<void>
	getUser    : (id: string) => Promise<User>,
	getUsers   : () => Promise<User[]>
	editUser   : (user: User) => Promise<void>
	createUser : (user: User) => Promise<void>
	deleteUser : (id: string) => Promise<void>

}

export const UserContext = createContext<UserContextType>({} as UserContextType)

type UserContextProviderProps = {
	children : JSX.Element
}

type UserContextProviderState = {
	users : User[],

}

export class UserContextProvider extends Component<UserContextProviderProps, UserContextProviderState> {
	url = environment.api_url

	constructor(props: UserContextProviderProps) {
		super(props)
		this.state = {
			users : [],
		}
	}


	async componentDidMount() {
		const users = await this.getUsers()
		this.setState({users: users})
	}

	private axiosRequest = async (method: Method, id?: string, user?: User) => {
		try {
			const result = await axios.request({
				url  : id ? this.url + id : this.url,
				method,
				data : user
			})
			return result.data

		} catch (e) {

			throw new Error(JSON.stringify(e as AxiosError))
		}
	}

	login = async (email: string, password: string) => {
		const token = "TOKEN" + email + Date.now().toLocaleString()
		localStorage.setItem("token", token)
		window.location.reload()

	}

	getUsers = async (): Promise<User[]> => {
		return this.axiosRequest("get")
	}

	getUser = async (id: string): Promise<User> => {
		return this.axiosRequest("get", id)
	}

	editUser = async (user: User) => {
		try {
			const result = await this.axiosRequest("put", user.id, user)
			this.setState({users: await this.getUsers()})
			return result
		} catch (e) {
			throw new Error(JSON.stringify(e as AxiosError))
		}

	}

	createUser = async (user: User) => {
		try {
			const result = await this.axiosRequest("post", undefined, user)
			this.setState({users: await this.getUsers()})
			return result
		} catch (e) {
			throw new Error(JSON.stringify(e as AxiosError))
		}

	}

	deleteUser = async (id: string) => {
		try {
			const result = await this.axiosRequest("delete", id)
			this.setState({users: await this.getUsers()})
			return result
		} catch (e) {
			throw new Error(JSON.stringify(e as AxiosError))
		}

	}

	render() {
		return <UserContext.Provider
			value={{
				users      : this.state.users,
				login      : this.login,
				getUser    : this.getUser,
				getUsers   : this.getUsers,
				editUser   : this.editUser,
				createUser : this.createUser,
				deleteUser : this.deleteUser,
			}}>
			{this.props.children}
		</UserContext.Provider>
	}
}

