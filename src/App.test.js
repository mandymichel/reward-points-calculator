import { render, screen } from '@testing-library/react';
import App from './App';

test("renders table headings", () => {
	render(<App />)
	const linkElement = screen.getByText(/Name/i)
	expect(linkElement).toBeInTheDocument()
	const linkElement2 = screen.getAllByText(/Points/i)
	expect(linkElement2[0]).toBeInTheDocument()
	expect(linkElement2[1]).toBeInTheDocument()
	const linkElement3 = screen.getAllByText(/Month/i)
	expect(linkElement3[0]).toBeInTheDocument()
	expect(linkElement3[1]).toBeInTheDocument()
})
