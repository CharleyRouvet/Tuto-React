import {useForm}   from "react-hook-form"
import React, {FC} from "react"

function withFormHook<T>(Component: React.ElementType): FC<T> {
	return function WrappedComponent(props) {
		const form = useForm()
		return <Component {...props} form={form}/>
	}
}

export default withFormHook
