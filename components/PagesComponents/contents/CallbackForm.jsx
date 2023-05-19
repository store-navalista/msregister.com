import React from "react";
import st from './CallbackForm.module.css'

function CallbackForm({ data }) {
	return (
		<>
			<form action="">
				<div>
					<label htmlFor=""></label>
					<select name="" id="">
						<option value="general issues">General issues</option>
						<option value="requests for service">Requests for service</option>
						<option value="port state control issues">Port State Control issues</option>
						<option value="general issues">General issues</option>
					</select>
				</div>
			</form>
		</>
	)
}

export default CallbackForm
