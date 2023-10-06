import {Component}         from "react"
import {User, UserContext} from "../services/UserService"
import DeleteUser          from "./modals/deleteUser"
import {
	Card,
	CardHeader,
	CircularProgress,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow
} from "@mui/material"
import EditUser        from "./modals/EditUser"
import {UseFormReturn} from "react-hook-form"
import withFormHook    from "./forms/FormWrapper"

class TableUser extends Component<{ form: UseFormReturn }, { page: number, rows: number }> {
	static contextType = UserContext

	columns = ["nom", "prénom", "email", "supprimer", "modifier"]

	constructor(props: { form: UseFormReturn }) {
		super(props)
		this.state = {
			rows : 3,
			page : 0
		}
	}

	getContentPagination = (): User[] => {
		const pages = this.state.page === 0 ? 1 : this.state.page
		if (pages && this.state.rows)
			return this.context.users
				.slice(this.state.page * this.state.rows, this.state.page * this.state.rows + this.state.rows)
		else
			return this.context.users
	}


	render() {
		if (this.context.users.length > 0) {
			return <Card>
				<CardHeader
					title={"Liste des utilisateurs"}
				/>
				<Divider/>
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{this.columns.map((column, index) => <TableCell key={index}>{column}</TableCell>)}
							</TableRow>
						</TableHead>
						<TableBody>
							{this.getContentPagination().map((user: User, index: number) => <TableRow key={index}>
								<TableCell>{user.lastName}</TableCell>
								<TableCell>{user.firstName}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<DeleteUser user={user}/>
								</TableCell>
								<TableCell>
									<EditUser user={user} form={this.props.form}/>
								</TableCell>

							</TableRow>)}

						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									count={this.context.users.length}
									onRowsPerPageChange={(r) => {
										this.setState({rows: parseInt(r.target.value)})
									}}
									labelRowsPerPage={""}
									onPageChange={(event, newPage) => {
										this.setState({page: newPage})
									}} page={this.state.page}
									rowsPerPage={this.state.rows}
									rowsPerPageOptions={[3, 10, 15, 20]}/>
							</TableRow>

						</TableFooter>
					</Table>
				</TableContainer>
			</Card>
		} else {
			return <CircularProgress/>

		}
	}
}

export default withFormHook(TableUser)
