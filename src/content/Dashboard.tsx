import {Component}             from "react"
import {Box, Grid, Typography} from "@mui/material"
import AddUser                 from "../components/modals/AddUser"
import TableUser               from "../components/Table"

class Dashboard extends Component {
	render() {
		return <Box sx={{padding: 5}}>
			<Grid container>
				<Grid item xs={6}>
					<Typography variant={"h3"}>Bienvenue</Typography>
				</Grid>
				<Grid item xs={6} alignSelf={"flex-end"}><AddUser/></Grid>
			</Grid>
			<Box sx={{paddingLeft: 20, paddingRight: 20, margin: 5}}>
				<TableUser/>
			</Box>


		</Box>
	}
}

export default Dashboard
