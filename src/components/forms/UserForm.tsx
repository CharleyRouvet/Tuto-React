import {Component}               from "react"
import {Button, Grid, TextField} from "@mui/material"
import {User}                    from "../../services/UserService"
import {UseFormReturn}           from "react-hook-form"
import {v4 as uuid}              from "uuid"

interface UserFormProps {
	user?  : User
	action : (user: User) => Promise<void>
	form   : UseFormReturn

}

interface UserFormState {
	user : User
}

class UserFormComponent extends Component<UserFormProps, UserFormState> {

	constructor(props: UserFormProps) {
		super(props)
		this.state = {
			user : props.user ? props.user : {
				id        : uuid(),
				firstName : "",
				lastName  : "",
				email     : ""
			}
		}
	}

	handleForm = () => {
		const data = this.props.form.getValues()
		this.setState((state) => ({
			user : {id: state.user.id, firstName: data.firstName, lastName: data.lastName, email: data.email}
		}))
	}

	render() {
		return <Grid container spacing={3}>
			<Grid item xs={6}>
				<TextField
					label={"Nom"}
					required
					fullWidth
					margin="normal"
					value={this.state.user.lastName}
					{...this.props.form.register(
						"lastName",
						{
							required  : true,
							maxLength : 100,
						}
					)}

					onKeyUp={this.handleForm}/>
			</Grid>
			<Grid item xs={6}>

				<TextField
					label={"Prénom"}
					required
					fullWidth
					margin="normal"
					value={this.state.user.firstName}
					{...this.props.form.register(
						"firstName",
						{
							required  : true,
							maxLength : 100,
						}
					)}
					onKeyUp={this.handleForm}/>
			</Grid>
			<Grid item xs={12}>

				<TextField
					label={"Email"}
					required
					fullWidth
					value={this.state.user.email}
					{...this.props.form.register(
						"email",
						{
							required  : true,
							maxLength : 100,
						}
					)}
					onKeyUp={this.handleForm}/>
			</Grid>
			<Grid item xs={12} justifyContent={"center"}>
				<Button sx={{marginLeft: "75%"}} color={"success"} variant={"contained"}
					onClick={() => this.props.action(this.state.user)}>{this.props.user ? "Modifier" : "Ajouter"}</Button>
			</Grid>

		</Grid>
	}
}

export default UserFormComponent
