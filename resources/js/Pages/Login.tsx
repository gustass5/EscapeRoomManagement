import { Head } from '@inertiajs/inertia-react';
import React from 'react';

const Login: React.FC = () => {
	return (
		<>
			<Head title="Login" />
			<div className="flex h-screen">
				<div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div>
							<img
								className="mx-auto py-6 h-18 w-auto"
								src="/images/ROC-Tilburg-logo.png"
								alt="Workflow"
							/>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Sign in to your account
							</h2>
						</div>
						<form className="mt-8 space-y-6" action="#" method="POST">
							<input type="hidden" name="remember" defaultValue="true" />
							<div className="rounded-md shadow-sm space-y-4">
								<div>
									<label htmlFor="email-address">Email address</label>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<div>
									<label htmlFor="password">Password</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-gray-900"
									>
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<a
										href="#"
										className="font-medium text-pink-600 hover:text-pink-500"
									>
										Forgot your password?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
				<div
					className="flex-1 bg-cover bg-center"
					style={{ 'background-image': 'url(/images/ROC_Tilburg.png)' }}
				></div>
			</div>
		</>
	);
};

export default Login;
