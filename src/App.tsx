import React                             from "react"
import Dashboard                         from "./content/Dashboard"
import {closeSnackbar, SnackbarProvider} from "notistack"
import CloseIcon                         from "@mui/icons-material/Close"
import {UserContextProvider}             from "./services/UserService"
import "./App.css"


function App() {
	return (
		<div className="App">
			<SnackbarProvider maxSnack={5} dense={true} autoHideDuration={3000}
				anchorOrigin={{vertical: "top", horizontal: "right"}}
				action={(snackbarId) => (
					<CloseIcon onClick={() => closeSnackbar(snackbarId)}/>
				)}><UserContextProvider>
					<Dashboard/>
				</UserContextProvider>

			</SnackbarProvider>

		</div>
	)
}

export default App
