import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customer.service";
export interface IRegisterFormTypes {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	city: string;
	address: string;
	postcode: string;
	username: string;
	password: string;
	password_confirmation: string;
}

const RegisterPage: React.FC = () => {
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IRegisterFormTypes>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			city: "",
			address: "",
			postcode: "",
			username: "",
			password: "",
			password_confirmation: "",
		},
	});

	const onSubmit = handleSubmit((data) => {
		if (data.password !== data.password_confirmation) {
			setError("password_confirmation", {
				type: "pattern",
				message: "Salasanat eivät täsmää",
			});
			return;
		}
		customerService.register(data).then(() => {
			navigate('/login')
		}).catch(() => {
			setError("username", {
				type: "pattern",
				message: "Käyttäjätunnus on jo käytössä",
			});
		});
	});
	return (
		<div className='flex items-center justify-center'>
			<form className='w-full md:w-2/3 xl:w-2/3  max-w px-5 py-10 flex flex-row bg-slate-50 shadow-xl shadow-slate-500 xl:divide-x-2 divide-slate-200' onSubmit={onSubmit}>
				<div className="w-0 flex items-center xl:w-2/4">
					<div className="container h-full px-5 w-full hidden xl:flex">
						<div className="-m-1 flex flex-wrap md:-m-2 ">
							<div className="flex w-2/3 flex-wrap">
								<div className="w-full p-1 md:p-2">
									<img
										alt="gallery"
										className="block h-full w-full rounded-lg object-cover object-center"
										src={process.env.PUBLIC_URL + '/images/hoodie.jpg'} />
								</div>
							</div>
							<div className="flex w-1/3 flex-wrap">
								<div className="w-full p-1 md:p-2">
									<img
										alt="gallery"
										className="block h-full w-full rounded-lg object-cover object-center"
										src={process.env.PUBLIC_URL + '/images/hoodie6.jpg'} />
								</div>
							</div>
							<div className="flex w-1/3 flex-wrap">
								<div className="w-full p-1 md:p-2">
									<img
										alt="gallery"
										className="block h-full w-full rounded-lg object-cover object-center"
										src={process.env.PUBLIC_URL + '/images/hoodie4.jpg'} />
								</div>
							</div>
							<div className="flex w-2/3 flex-wrap">
								<div className="w-full p-1 md:p-2">
									<img
										alt="gallery"
										className="block h-full w-full rounded-lg object-cover object-center"
										src={process.env.PUBLIC_URL + '/images/hoodie3.jpg'} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full xl:w-2/4 px-5">
					<div className="divide-slate-300 pb-5">
						<h1 className="text-3xl">Register</h1>
						<div></div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-first-name'>
								First Name
							</label>
							<Controller
								control={control}
								name='first_name'
								rules={{
									required: true
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='Jane'
											{...field}
											style={{ borderColor: errors.first_name ? "red" : "" }}
										/>
										{errors.first_name && (
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-last-name'>
								Last Name
							</label>
							<Controller
								control={control}
								name='last_name'
								rules={{ required: true }}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='Doe'
											{...field}
											style={{ borderColor: errors.last_name ? "red" : "" }}
										/>
										{errors.last_name && (
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-email'>
								E-mail
							</label>
							<Controller
								control={control}
								name='email'
								rules={{
									required: true,
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "invalid email address"
									}

								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='******************'
											{...field}
											style={{ borderColor: errors.email ? "red" : "" }}
										/>
										{errors.email && (
											<p className='text-red-500 text-xs italic'>
												{errors.email.message ? errors.email.message : "Please fill out this field."}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-4l'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-phone'>
								Phonenumber
							</label>
							<Controller
								control={control}
								name='phone'
								rules={{
									required: true,
									minLength: 3,
									pattern: {
										value: /^[0-9]{10}$/,
										message: "invalid phone number"
									}
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='******************'
											{...field}
											style={{ borderColor: errors.phone ? "red" : "" }}
										/>
										{errors.phone && (
											<p className='text-red-500 text-xs italic'>
												{errors.phone.message ? errors.phone.message : "Please fill out this field."}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='flex flex-wrap -mx-3 mb-6'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-city'>
								City
							</label>
							<Controller
								control={control}
								name='city'
								rules={{
									required: true,
									minLength: 3,
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='Albuquerque'
											{...field}
											style={{ borderColor: errors.city ? "red" : "" }}
										/>
										{errors.city && (
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
											</p>
										)}
									</>
								)}
							/>
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='PostCode'>
								Post Code
							</label>
							<Controller
								control={control}
								name='postcode'
								rules={{
									required: true,
									minLength: 3,
									pattern: {
										value: /^[0-9]{5}$/,
										message: "invalid postcode"
									}
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='90210'
											{...field}
											style={{ borderColor: errors.postcode ? "red" : "" }}
										/>
										{errors.postcode && (
											<p className='text-red-500 text-xs italic'>
												{errors.postcode.message ? errors.postcode.message : "Please fill out this field."}
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
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-address'>
								Address
							</label>
							<Controller
								control={control}
								name='address'
								rules={{ 
									required: true,
									minLength: 3,
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											type='text'
											placeholder='******************'
											{...field}
											style={{ borderColor: errors.address ? "red" : "" }}
										/>
										{errors.address && (
											<p className='text-red-500 text-xs italic'>
												Please fill out this field.
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
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-username'>
								Username
							</label>
							<Controller
								control={control}
								name='username'
								rules={{ 
									required: true,
									minLength: {message: "Username must be at least 7 characters", value: 7},
								}}
								render={({ field }) => (
									<>
										<input
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											id='grid-username'
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
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
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
					<div className='flex flex-wrap -mx-3 mb-2'>
						<div className='w-full px-3'>
							<label
								className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
								htmlFor='grid-password-confirmation'>
								Password Confirmation
							</label>
							<Controller
								control={control}
								name='password_confirmation'
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
											style={{ borderColor: errors.password_confirmation ? "red" : "" }}
										/>
										{errors.password_confirmation && (
											<p className='text-red-500 text-xs italic'>
												{errors.password_confirmation.message ? errors.password_confirmation.message : "Please fill out this field."}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>
					<div className='md:flex md:items-center'>
						<div className='md:w-1/3'>
							<button
								className='shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded '
								type='submit'>
								Register
							</button>
						</div>
						<div className='md:w-2/3'></div>
					</div>
				</div>
			</form>
		</div >
	);
};

export default RegisterPage;
