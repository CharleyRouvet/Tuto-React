import {Component}               from "react"
import {User}                    from "../../services/UserService"
import {UseFormReturn}           from "react-hook-form"
import {Button, Grid, TextField} from "@mui/material"

interface LoginFormProps {
	user?  : User
	action : (email: string, password: string) => Promise<void>
	form   : UseFormReturn

}

interface LoginFormState {
	email    : string,
	password : string
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {


	constructor(props: LoginFormProps) {
		super(props)
		this.state = {
			email    : "",
			password : ""
		}
	}

	handleForm = () => {
		const data = this.props.form.getValues()
		this.setState({
			email : data.email, password : data.password
		})
	}

	render() {
		return <Grid container spacing={3}>
			<Grid item xs={12}>
				<TextField
					label={"Email"}
					required
					fullWidth
					type="email"
					margin="normal"
					value={this.state.email}
					{...this.props.form.register(
						"email",
						{
							required  : true,
							maxLength : 100,
						}
					)}
					onKeyUp={this.handleForm}/>

			</Grid>
			<Grid item xs={12}>
				<TextField
					label={"Mot de passe"}
					required
					fullWidth
					type="password"
					margin="normal"
					value={this.state.password}
					{...this.props.form.register(
						"password",
						{
							required  : true,
							maxLength : 100,
						}
					)}
					onKeyUp={this.handleForm}/>
			</Grid>
			<Grid item xs={12} justifyContent={"center"}>
				<Button sx={{marginLeft: "75%"}} color={"success"} variant={"contained"}
					onClick={() => this.props.action(this.state.email, this.state.password)}>Se Connecter</Button>
			</Grid>

		</Grid>
	}
}

export default LoginForm
