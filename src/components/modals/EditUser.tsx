import {Component}                 from "react"
import {User, UserContext}         from "../../services/UserService"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined"
import {enqueueSnackbar}           from "notistack"
import withFormHook                from "../forms/FormWrapper"
import {ModalUserState}            from "./AddUser"
import {UseFormReturn}             from "react-hook-form"
import BaseModal                   from "./modal"
import UserForm                    from "../forms/UserForm"

interface EditUserProps {
	user : User,
	form : UseFormReturn
}

class EditUser extends Component<EditUserProps, ModalUserState> {
	static contextType = UserContext

	constructor(props: EditUserProps) {
		super(props)
		this.state = {open: false, user: props.user}
	}

	handleModal = () => {
		this.setState((prev) => ({open: !prev.open}))
	}

	editUser = async (user: User) => {
		try {
			await this.context.editUser(user)
			enqueueSnackbar("utilisateur modifié avec succès", {variant: "success"})
			this.handleModal()

		} catch (err) {
			enqueueSnackbar("impossible de modifier l'utilisateur", {variant: "error"})
		}
	}
	
	render() {
		return <>
			<BaseModal
				modalOpen={this.handleModal} open={this.state.open} title={"Modification d'un utilisateur"}
				icon={<ModeEditOutlineOutlinedIcon/>}
				content={<UserForm action={(user) => this.editUser(user)} form={this.props.form}
					user={this.props.user}/>}
			/>

		</>
	}
}

export default withFormHook<EditUserProps>(EditUser)
