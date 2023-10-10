import React                             from "react"
import Dashboard                         from "./content/Dashboard"
import {closeSnackbar, SnackbarProvider} from "notistack"
import CloseIcon                         from "@mui/icons-material/Close"
import {UserContextProvider}             from "./services/UserService"
import "./App.css"
import Login                             from "./content/Login"


function App() {
	const isAuth = localStorage.getItem("token")
	return (
		<div className="App">
			<SnackbarProvider maxSnack={5} dense={true} autoHideDuration={3000}
				anchorOrigin={{vertical: "top", horizontal: "right"}}
				action={(snackbarId) => (
					<CloseIcon onClick={() => closeSnackbar(snackbarId)}/>
				)}><UserContextProvider>
					{isAuth ? <Dashboard/> : <Login/>}
				</UserContextProvider>
			</SnackbarProvider>

		</div>
	)
}

export default App
