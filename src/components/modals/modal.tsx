import {Component, ReactNode}                                                  from "react"
import {Button, Card, CardActions, CardContent, CardHeader, IconButton, Modal} from "@mui/material"
import {UserContext}                                                           from "../../services/UserService"

export interface ModalState {
	open  : boolean
	title : string
}

export interface ModalProps {
	title     : string
	content   : ReactNode
	modalOpen : () => void
	open      : boolean
	icon?     : ReactNode

}

class BaseModal extends Component<ModalProps, ModalState> {
	static contextType = UserContext

	constructor(props: ModalProps) {
		super(props)
		this.state = {open: props.open, title: props.title}
	}

	render() {
		return <>{this.props.icon ? <IconButton onClick={this.props.modalOpen}>
			{this.props.icon}
		</IconButton> : <Button variant={"contained"} onClick={this.props.modalOpen}>{this.props.title}</Button>}<Modal
			open={this.props.open}
			onClose={this.props.modalOpen}>

			<Card sx={{
				position  : "absolute" as const,
				top       : "50%",
				left      : "50%",
				transform : "translate(-50%, -50%)",
				width     : 400,
				bgcolor   : "background.paper",
				border    : "2px solid #000",
				boxShadow : 24,
				p         : 4,
			}}>
				<CardHeader title={this.props.title}/>
				<CardContent>
					{this.props.content}
					{/*{this.props.children}*/}
				</CardContent>
				<CardActions>
					<Button variant={"outlined"} onClick={this.props.modalOpen}>Annuler</Button>
				</CardActions>
			</Card>

		</Modal></>
	}
}

export default BaseModal
