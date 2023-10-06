import {Component}               from "react"
import {User, UserContext}       from "../../services/UserService"
import {enqueueSnackbar}         from "notistack"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import BaseModal                 from "./modal"
import {Button, Typography}      from "@mui/material"

interface DeleteUserState {
	open : boolean
}

interface DeleteUserProps {
	user : User
}

class DeleteUser extends Component<DeleteUserProps, DeleteUserState> {
	static contextType = UserContext

	constructor(props: DeleteUserProps) {
		super(props)
		this.state = {open: false}
	}

	handleModal = () => {
		this.setState((prev) => ({open: !prev.open}))
	}

	private deleteUser = async () => {
		try {
			await this.context.deleteUser(this.props.user.id)
			enqueueSnackbar("utilisateur supprimé avec succès", {variant: "success"})
			this.handleModal()
		} catch (e) {
			enqueueSnackbar("impossible de supprimer l'utilisateur", {variant: "error"})
		}
	}

	render() {
		return <BaseModal
			modalOpen={this.handleModal}
			open={this.state.open}
			title={"Confirmer la suppression de l'utilisateur"}
			icon={<DeleteOutlineOutlinedIcon/>}
			content={<>
				<Typography variant="h4">Vous êtes sur le point de
					supprimer {this.props.user.lastName} {this.props.user.firstName}<Button color={"error"}
					variant={"contained"}
					// sx={{marginLeft: "75%"}}
					onClick={this.deleteUser}>Supprimer</Button></Typography>

			</>}
		/>

	}
}

export default DeleteUser
