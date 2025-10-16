import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<PrivateHeader />
			{children}
		</div>
	)
}
