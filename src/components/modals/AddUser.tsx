import {Component}         from "react"
import {UseFormReturn}     from "react-hook-form"
import {User, UserContext} from "../../services/UserService"
import {enqueueSnackbar}   from "notistack"
import withFormHook        from "../forms/FormWrapper"
import {v4 as uuidv4}      from "uuid"
import UserForm            from "../forms/UserForm"
import BaseModal           from "./modal"

export interface ModalUserState {
	user : User
	open : boolean
}

interface AddUserProps {
	form : UseFormReturn
}


class AddUserModal extends Component<AddUserProps, ModalUserState> {
	static contextType = UserContext

	constructor(props: AddUserProps) {
		super(props)
		this.state = {open: false, user: {id: uuidv4(), firstName: "", lastName: "", email: ""}}
	}

	handleModal = () => {
		this.setState((prev) => ({open: !prev.open}))
	}

	addUser = async () => {
		try {
			const user = this.props.form.getValues()
			await this.context.createUser(user)
			enqueueSnackbar("utilisateur créé avec succès", {variant: "success"})
			this.handleModal()

		} catch (err) {
			enqueueSnackbar("impossible d'ajouter l'utilisateur", {variant: "error"})
		}
	}

	render() {
		return <BaseModal
			content={<UserForm action={this.addUser} form={this.props.form}/>}
			title={"Ajouter un utilisateur"}
			open={this.state.open}
			// content={<UserForm action={(user) => this.addUser(user)}/>}
			modalOpen={this.handleModal}>


		</BaseModal>


	}
}

export default withFormHook(AddUserModal)
