import { useCart } from "../context/CartContext";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import orderService, { ICustomer } from "../../services/order.service";
import customerService from "../../services/customer.service";
import { ICartItem } from "../../models/cart";
import { Link } from "react-router-dom";

interface ICheckoutFormTypes {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	city: string;
	address: string;
	postcode: string;
}

const CheckoutModal: React.FC = () => {
	const { cartItems, cartTotal, clearCart } = useCart();
	const [fullOrder, setFullOrder] = React.useState([]);
	const [isuser, setIsUser] = React.useState<boolean>(false);
	const [submitted, setSubmitted] = React.useState<boolean>(false);
	const [processing, setProcessing] = React.useState<boolean>(false);
	const modalRef = React.useRef<HTMLDivElement>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ICheckoutFormTypes>({
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

	React.useEffect(() => {
		const openModal = () => {
			customerService
				.getCustomer()
				.then((res) => {
					if (res.data === null) {
						setIsUser(false);
					} else {
						setIsUser(true);
						control._reset({
							first_name: res.data.first_name,
							last_name: res.data.last_name,
							email: res.data.email,
							phone: res.data.phone,
							city: res.data.city,
							address: res.data.address,
							postcode: res.data.postcode,
						});
					}
				})
				.catch((err) => {
					setIsUser(false);
				});
		};

		if (modalRef.current) {
			modalRef.current.addEventListener("shown.bs.modal", openModal);
		}
		return () => {
			if (modalRef.current) {
				modalRef.current.removeEventListener("shown.bs.modal", openModal);
			}
		};
	}, []);

	const onSubmit = handleSubmit((data: ICheckoutFormTypes) => {
		const OrderItems = cartItems.map((item) => {
			return {
				product_id: item.id,
				quantity: item.quantity,
				size_id: item.size_id,
			};
		});

		
		setProcessing(true);
		orderService
			.createOrder(data, OrderItems)
			.then((res) => {
				setFullOrder(res.data);
				clearCart();
				setSubmitted(true);
				setTimeout(() => {
					setProcessing(false);
				}, 1500);
			})
			.catch(() => { });
	});

	const confirmOrder = () => {
		setSubmitted(false);
	};



	return (
		<div
			className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto chechkoutModal'
			id='exampleModalLg'
			aria-labelledby='exampleModalLgLabel'
			aria-modal='true'
			aria-hidden='true'
			role='dialog'
			ref={modalRef}>
			<div className='modal-dialog modal-xl relative w-auto pointer-events-none'>
				{!submitted ? (
					<div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
						<div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
							<h5
								className='text-xl font-medium leading-normal text-gray-800'
								id='exampleModalLgLabel'>
								Checkout
							</h5>
							<button
								type='button'
								className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
								data-bs-dismiss='modal'
								id='closeModal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body relative flex p-4 flex-wrap xl:flex-nowrap'>
							<form className='w-full max-w' id='checkoutform' onSubmit={onSubmit}>
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
												required: true,
											}}
											render={({ field }) => (
												<>
													<input
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
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
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
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
													message: "invalid email address",
												},
											}}
											render={({ field }) => (
												<>
													<input
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
														type='text'
														placeholder='******************'
														{...field}
														style={{ borderColor: errors.email ? "red" : "" }}
													/>
													{errors.email && (
														<p className='text-red-500 text-xs italic'>
															{errors.email.message
																? errors.email.message
																: "Please fill out this field."}
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
													message: "invalid phone number",
												},
											}}
											render={({ field }) => (
												<>
													<input
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
														type='text'
														placeholder='******************'
														{...field}
														style={{ borderColor: errors.phone ? "red" : "" }}
													/>
													{errors.phone && (
														<p className='text-red-500 text-xs italic'>
															{errors.phone.message
																? errors.phone.message
																: "Please fill out this field."}
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
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
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
													message: "invalid postcode",
												},
											}}
											render={({ field }) => (
												<>
													<input
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
														type='text'
														placeholder='90210'
														{...field}
														style={{ borderColor: errors.postcode ? "red" : "" }}
													/>
													{errors.postcode && (
														<p className='text-red-500 text-xs italic'>
															{errors.postcode.message
																? errors.postcode.message
																: "Please fill out this field."}
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
														disabled={isuser}
														className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${isuser
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
															}`}
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
								{isuser ? (
									<div className='w-full px-3 text-sm'>
										If you want to change your profile information please go to your
										profile page
										<Link to='/profile' className="text-blue-600 underline" onClick={() => document.getElementById('closeModal')?.click()}> here</Link>
									</div>
								) : (
									<div className='w-full px-3 text-sm'>
										If you want to create an account please click it gives you more benefits
										Like saving your information and tracking your orders
										<Link to='/register' className="text-blue-600 underline" onClick={() => document.getElementById('closeModal')?.click()}> Register here</Link>
									</div>
								)
								}
							</form>
							<div className='flex items-center justify-between p-6 m-5 xl:border-l border-solid border-gray-300 rounded-b'></div>
							<div className='flex justify-center checkoutList flex-wrap w-full'>
								<h1 className='text-2xl font-bold text-gray-900'>Your Order</h1>
								<ul className='bg-white rounded-lg h-2/3 w-full text-gray-900 overflow-y-auto'>
									{cartItems?.map((item, i) => (
										<li
											key={i}
											className='flex justify-between items-center p-4 border-b border-solid'>
											<div className='flex items-center'>
												<img
													className='h-16 w-16 rounded-lg'
													src={process.env.PUBLIC_URL + "/images/" + item.imageName}
													alt={item.name}
												/>
												<div className='flex flex-col ml-4'>
													<span className='font-bold first-letter:uppercase'>
														{item.name} {item.size ? `(${item.size})` : ""}
													</span>
													<span className='text-sm text-gray-500'>
														{item.price * item.quantity} €
													</span>
												</div>
												<div className='flex items-center'></div>
											</div>
											<div className='flex items-center'>
												<div
													className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg mr-5'
													role='group'>
													<span className='bg-gray-100 text-gray-700 text-sm font-bold px-4 py-2'>
														{item.quantity}
													</span>
												</div>
											</div>
										</li>
									))}
								</ul>
								<div className='h-24 xl:h-0 w-64 xl:w-96 lg:w-96 sm:w-72 '>
									<div className='flex justify-between items-center h-12 w-64 xl:w-96 lg:w-96 sm:w-72 px-4 py-3 bg-gray-100 absolute bottom-9'>
										<span className='text-gray-600'>Total</span>
										<span className='text-gray-700 font-bold'>{cartTotal} €</span>
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center justify-between p-6 border-t border-solid border-gray-300 rounded-b'>
							<button
								className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
								type='button'
								style={{ transition: "all .15s ease" }}
								data-bs-dismiss='modal'
								aria-label='Close'>
								Close
							</button>
							<button
								className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
								type='submit'
								style={{ transition: "all .15s ease" }}
								form='checkoutform'>
								Send order
							</button>
						</div>
					</div>
				) : (
					<div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
						{
							processing ? (
								<div className='modal-body relative flex p-4 flex-wrap xl:flex-nowrap items-center justify-center h-40'>
									<div className='flex flex-col items-center'>
										<svg
											className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8v8H4z'></path>
										</svg>
										<span className='text-gray-900'>Processing...</span>
									</div>
								</div>
							) : (
								<>
									<div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
										<h5
											className='text-xl font-medium leading-normal text-gray-800'
											id='exampleModalLgLabel'>
											Thank you for your order!
										</h5>
										<button
											type='button'
											className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
											onClick={() => {
												confirmOrder();
											}}
											data-bs-dismiss='modal'
											aria-label='Close'></button>
									</div>
									<div className='modal-body relative flex p-4 flex-wrap xl:flex-nowrap justify-center'>
										<div className='flex flex-wrap mx-3 mb-2 h-full'>
											<div className='flex justify-center checkoutList flex-wrap w-full h-full'>
												<h1 className='text-2xl font-bold text-gray-900'>Your Order</h1>
												<ul className='bg-white rounded-lg h-2/3 w-full text-gray-900 overflow-y-auto'>
													{fullOrder.map((item: ICartItem, i) => (
														<li
															key={i}
															className='flex justify-between items-center p-4 border-b border-solid'>
															<div className='flex items-center'>
																<img
																	className='h-16 w-16 rounded-lg'
																	src={process.env.PUBLIC_URL + "/images/" + item.imageName}
																	alt={item.name}
																	loading='lazy'
																/>
																<div className='flex flex-col ml-4'>
																	<span className='font-bold first-letter:uppercase'>
																		{item.name} {item.size ? `(${item.size})` : ""}
																	</span>
																	<span className='text-sm text-gray-500'>
																		{item.price * item.quantity} €
																	</span>
																</div>
																<div className='flex items-center'></div>
															</div>
															<div className='flex items-center'>
																<div
																	className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg mr-5'
																	role='group'>
																	<span className='bg-gray-100 text-gray-700 text-sm font-bold px-4 py-2'>
																		{item.quantity}
																	</span>
																</div>
															</div>
														</li>
													))}
												</ul>
												<div className='h-24 xl:h-24 w-64 xl:w-96 lg:w-96 sm:w-72 '>
													<div className='flex justify-between items-center h-12 w-64 xl:w-96 lg:w-96 sm:w-72 px-4 py-3 bg-gray-100 absolute bottom-9'>
														<span className='text-gray-600'>Total</span>
														<span className='text-gray-700 font-bold'>
															{fullOrder.reduce(
																(acc: number, item: ICartItem) =>
																	acc + item.quantity * item.price,
																0
															)}{" "}
															€
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						}
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutModal;
