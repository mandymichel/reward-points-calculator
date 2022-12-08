import "./App.css"
import React, { useEffect, useState } from "react"
import { fetchCustomerData } from "./service.js"

function App() {
	const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchCustomerData()
				setData(response)
			} catch (error) {
				console.log("error: ", error)
			}
		}
		fetchData()
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				<table className="tg">
					<thead>
						<tr>
							<td>Name</td>
							<td>Month</td>
							<td>Points per Month</td>
							<td>Points per Year</td>
						</tr>
						{data?.map((d) => {
							return (
								<tr key={d.id}>
									<td className="tg-0lax">{d.name}</td>
									<td className="tg-0lax">{d.month}</td>
									<td className="tg-0lax">{d.monthPoints}</td>
									<td className="tg-0lax">{d.totalPoints}</td>
								</tr>
							)
						})}
					</thead>
				</table>
			</header>
		</div>
	)
}

export default App
