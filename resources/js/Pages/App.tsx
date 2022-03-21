import React from 'react';
import Layout from './Layout';
import { Head } from '@inertiajs/inertia-react';

const App: React.FC = () => {
	return (
		<Layout>
			<Head title="App" />
			<h1 className="text-xl text-red-500 ">App</h1>
		</Layout>
	);
};

export default App;
