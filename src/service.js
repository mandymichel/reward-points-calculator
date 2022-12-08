import { customerData } from "./customerData";

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const getPoints = (itemPrice) => {
	const points = itemPrice > 100 ? 2 * (itemPrice - 100) + 50 : itemPrice - 50
	return points
}

const addPoints = (cData) => {
	const newCData = cData.map((c) => {
		const pDate = new Date(c.purchaseDate)
		const pDateNum = pDate.getMonth()
		const pDateMonth = monthNames[pDateNum]
		return {
			...c,
			month: pDateMonth,
		}
	})
	const customSort = (a, b) => (a > b) - (a < b)
	newCData.sort((a, b) => {
		return customSort(a.name, b.name) || customSort(a.month, b.month)
	})

	let c = 0
	let t = 0
	let name = newCData[0].name
	let month = newCData[0].month
	let nameChanged = false
	let monthChanged = false
	const newArray = []
	const consolidatedArray = []
	for (let i = 0; i < newCData.length; i++) {
		if (newCData[i].name !== name) {
			name = newCData[i].name
			nameChanged = true
			c = 0
			t = 0
		} else {
			nameChanged = false
		}
		if (newCData[i].month !== month) {
			month = newCData[i].month
			monthChanged = true
			c = 0
		} else {
			monthChanged = false
		}
		const newItem = {
			monthPoints: (c += getPoints(newCData[i].itemPrice)),
			name: name,
			month: month,
			totalPoints: (t += getPoints(newCData[i].itemPrice)),
		}
		if (month && !nameChanged) {
			newArray.push(newItem)
		}
		if (nameChanged) {
			newArray.push(newItem)
		}
		if (monthChanged) {
			consolidatedArray.push(newArray[newArray.indexOf(newItem) - 1])
		} else if (i === newCData.length - 1) {
			consolidatedArray.push(newArray[newArray.indexOf(newItem)])
		}
	}
	return consolidatedArray
}

const fetchCustomerData = async () => {
  const data = addPoints(customerData)
  return data;
};

export { fetchCustomerData };
