export default function Main(props: {
	children: React.ReactNode
}) {
	const { children } = props;

	return (
		<main className="py-10 max-w-7xl mx-auto px-6 lg:px-8">
			{children}
		</main>
	)
}