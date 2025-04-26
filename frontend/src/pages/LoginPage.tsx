import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customer.service";
import TokenService from "../services/token.service";

interface ILoginForm {
	username: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const navigate = useNavigate()

	const { control, handleSubmit, setError, formState: { errors } } = useForm<ILoginForm>({
		defaultValues: {
			username: "",
			password: "",
		},
	})


	const onSubmit = handleSubmit((e) => {
		customerService.login(e).then((res) => {
			TokenService.setToken(res.data.token)
			navigate("/")
		}).catch(() => { 
			setError("password", {
				type: "manual",
				message: "Invalid username or password",
			});
			setError("username", {
				type: "manual",
				message: " ",
			});
		});
	});

	return (
		<div className='flex justify-center content-center '>
			<div className='bg-slate-50 shadow-lg shadow-slate-400 rounded-lg p-8 mt-52 px-52'>
				<h2 className='text-slate-700 text-2xl font-bold mb-8'>Login</h2>
				<form onSubmit={onSubmit}>
					<div className='flex flex-wrap -mx-3 mb-2'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2'
								htmlFor='grid-username'>
								Username
							</label>
							<Controller
								control={control}
								name='username'
								rules={{ required: true }}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='******************'
											{...field}
											style={{ borderColor: errors.username ? "red" : "" }}
										/>
										{errors.username && (
											<p className='text-red-500 text-xs italic'>
												{errors.username.message ? errors.username.message : "Please fill out this field."}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-2'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-slate-700 text-xs font-bold mb-2'
								htmlFor='grid-password'>
								Password
							</label>
							<Controller
								control={control}
								name='password'
								rules={{
									required: true,
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='password'
											placeholder='******************'
											{...field}
											style={{ borderColor: errors.password ? "red" : "" }}
										/>
										{errors.password && (
											<p className='text-red-500 text-xs italic'>
												{errors.password.message ? errors.password.message : "Please fill out this field."}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
