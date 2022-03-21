import React from 'react';

const Layout: React.FC = ({ children }) => {
	return (
		<main>
			<header></header>
			<article>{children}</article>
		</main>
	);
};

export default Layout;
