import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ICartItem } from "../models/cart";
import customerService from "../services/customer.service";
import { ICustomer } from "../services/order.service";
import OrderTable from "../components/product/productTable";

export interface IOrder {
	ordered_items: ICartItem[];
	status: string;
	created_at: string;
}

const ProfilePage: React.FC = () => {
	const [orders, setOrders] = React.useState<IOrder[]>([]);
	const [ActiveTab, setActiveTab] = React.useState<"profile" | "orders">("profile");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ICustomer>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			city: "",
			address: "",
			postcode: "",
		},
	});

	const onSubmit = handleSubmit((data) => {
		customerService
			.updateCustomer(data)
			.then(() => {
				fetchCustomer();
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const fetchCustomer = () => {
		customerService
			.getCustomer()
			.then((res) => {
				control._reset({
					first_name: res.data.first_name,
					last_name: res.data.last_name,
					email: res.data.email,
					phone: res.data.phone,
					city: res.data.city,
					address: res.data.address,
					postcode: res.data.postcode,
				});
			})
			.catch();
	};

	React.useEffect(() => {
		fetchCustomer();
		customerService
			.getCustomersOrders()
			.then((res) => {
				setOrders(res.data);
			})
			.catch();
	}, []);

	return (
		<div className='flex-1 flex flex-row'>
			<div className='shadow-md shadow-slate-700 mr-5'>
				<ul className='flex list-none flex-col flex-wrap pl-0'>
					<li
						role='presentation'
						className={`flex-grow text-center hover:backdrop-brightness-95 px-6 cursor-pointer p-5 text-md text-slate-400
						${ActiveTab === "profile" && "border-slate-600 border-1 text-slate-800 "}`}
						onClick={() => setActiveTab("profile")}>
						Profile
					</li>
					<li
						role='presentation'
						className={`flex-grow text-center hover:backdrop-brightness-95 px-6 cursor-pointer p-5 text-md text-slate-400
						 ${ActiveTab === "orders" && "border-slate-600 border-1 text-slate-800 "}`}
						onClick={() => setActiveTab("orders")}>
						Previous Orders
					</li>
				</ul>
			</div>
			<div className='pt-8 w-full'>
				<div className='flex flex-col'>
					{ActiveTab === "profile" && (
						<div className=''>
							<div className='flex items-center justify-center'>
								<form className='w-2/3 max-w' id='checkoutform' onSubmit={onSubmit}>
									<div className="divide-y-2 divide-slate-300 pb-8">
										<h1 className="text-2xl">Profile</h1>
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
									<div className='md:flex md:items-center'>
										<div className='md:w-1/3'>
											<button
												className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
												type='submit'>
												Update
											</button>
										</div>
										<div className='md:w-2/3'></div>
									</div>
								</form>
							</div>
						</div>
					)}
					{ActiveTab === "orders" && (
						<div className='flex flex-col'>
								<div className="divide-y-2 divide-slate-200 pb-2 w-48">
										<h1 className="text-2xl">Previous orders</h1>
										<div></div>
									</div>
							<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
								<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
									<div className='overflow-hidden'>
										<table className='min-w-full divide-y divide-gray-200'>
											<thead className='bg-gray-50'>
												<tr>
													<th
														scope='col'
														className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>
													</th>
													<th
														scope='col'
														className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>
														Order date
													</th>
													<th
														scope='col'
														className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>
														Status
													</th>
													<th
														scope='col'
														className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>
														Price
													</th>
												</tr>
											</thead>
											<tbody>
												{orders?.map((order, i) => (
													<OrderTable order={order} key={i} />
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
