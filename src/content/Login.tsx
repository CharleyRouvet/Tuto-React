import {Component}         from "react"
import LoginForm           from "../components/forms/loginForm"
import withFormHook        from "../components/forms/FormWrapper"
import {UseFormReturn}     from "react-hook-form"
import {UserContext}       from "../services/UserService"
import {Paper, Typography} from "@mui/material"

interface LoginProps {
	form : UseFormReturn
}

class Login extends Component<LoginProps> {
	static contextType = UserContext

	render() {
		return (<Paper sx={{padding: 5, margin: 10}}>
			<Typography variant="h3"> Se Connecter</Typography>
			<LoginForm action={this.context.login} form={this.props.form}/>
		</Paper>

		)
	}
}

export default withFormHook(Login)
