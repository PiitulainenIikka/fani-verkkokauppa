import React from "react";
import { Link, useLocation } from "react-router-dom";
import useOutsideClick from "../../hooks/detectClick";
import TokenService from "../../services/token.service";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../modals/checkout";
import ProductSearch from "../product/productSearch";

const NavBar: React.FC<React.PropsWithChildren> = () => {
	const location = useLocation()
	const [needToRefresh, setNeedToRefresh] = React.useState(false)
	const [isCartOpen, setIsCartOpen] = React.useState(false);
	const { cartItems, cartTotal, clearCart, removeFromCart, subtractQuantity, incrementQuantity,RefreshCart } = useCart();
	const ref = React.useRef<HTMLDivElement>(null);
	const cartButtonRef = React.useRef<HTMLDivElement>(null);
	const userTabRef = React.useRef<HTMLDivElement>(null);
	const [isUserTabOpen, setIsUserTabOpen] = React.useState(false);

	useOutsideClick([ref, userTabRef], () => {
		setIsUserTabOpen(false);
	});

	useOutsideClick([ref, cartButtonRef], () => {
		setIsCartOpen(false);
	});
	React.useEffect(() => {
		if (location.pathname === "/login") {
			setNeedToRefresh(true)
		}
		RefreshCart()
	}, [location])


	return (
		<>
			<nav className='w-full flex flex-wrap items-center justify-between py-3 bg-black navbar navbar-expand-lg z-50 fixed '>
				<div className='sticky container-fluid w-full flex flex-wrap items-center justify-between px-6 '>
					<button
						className='navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent1'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<svg
							aria-hidden='true'
							focusable='false'
							data-prefix='fas'
							data-icon='bars'
							className='w-6'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'>
							<path
								fill='currentColor'
								d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
						</svg>
					</button>
					<div
						className='collapse navbar-collapse flex-grow items-center'
						id='navbarSupportedContent1'>
						<a className='text-xl text-white pr-2 font-semibold' href='/'>
							<img
								src={process.env.PUBLIC_URL + "/images/logoNoBgThin.png"}
								height='50'
								width={"100"}></img>
						</a>
						<ul className='navbar-nav flex flex-col pl-0 list-style-none mr-auto'>
							<li className='nav-item p-2'>
								<Link className='nav-link text-white hover:opacity-80' to='/'>
									Home
								</Link>
							</li>
							{
								TokenService.hasToken() &&
								<li className='nav-item p-2'>
									<Link
										className='nav-link text-white hover:opacity-80 focus:opacity-80 p-0'
										to='/profile'>
										Profile
									</Link>
								</li>
							}
						</ul>
						<ul className='navbar-nav flex-col pl-0 list-style-none mr-auto '>
							<li className='nav-item'>
								<ProductSearch />
							</li>
						</ul>
					</div>

					<div className='flex items-center relative'>
						<div className='text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-5 mt-3'>
							<div className='inline-flex relative w-fit' ref={cartButtonRef}>
								<div
									onClick={() => {
										setIsCartOpen(!isCartOpen);
									}}
									className='absolute inline-block top-0 left-2.5 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-700 text-white rounded-full z-10'>
									{cartItems.reduce((acc, item) => acc + item.quantity, 0)}
								</div>
								<svg
									aria-hidden='true'
									focusable='false'
									data-prefix='fas'
									data-icon='shopping-cart'
									height={22}
									width={22}
									role='img'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 576 512'
									onClick={() => {
										setIsCartOpen(!isCartOpen);
									}}>
									<path
										fill='currentColor'
										d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'></path>
								</svg>
							</div>
						</div>
						{TokenService.hasToken() ? (
							<div className='relative ml-3' ref={userTabRef}>
								<div>
									<button
										type='button'
										className='flex rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0 focus:ring-offset-gray-800'
										onClick={() => setIsUserTabOpen(!isUserTabOpen)}>
										<span className='sr-only'>Open user menu</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											id='Layer_1'
											x='0'
											y='0'
											enableBackground='new 0 0 16 16'
											version='1.1'
											viewBox='0 0 16 16'
											xmlSpace='preserve'
											height={42}
											width={42}>
											<path
												id='path7'
												fill='#ffffff'
												stroke='none'
												d='M8 .986A7.022 7.022 0 0 0 .986 8c0 1.874.73 3.635 2.055 4.959A6.965 6.965 0 0 0 8 15.014 7.022 7.022 0 0 0 15.014 8 7.022 7.022 0 0 0 8 .986zm0 1A6.021 6.021 0 0 1 14.014 8a5.984 5.984 0 0 1-1.606 4.074 5.836 5.836 0 0 0-2.564-1.754 2.999 2.999 0 0 0 1.11-2.326A2.997 2.997 0 0 0 7.94 5.006a2.997 2.997 0 0 0-2.988 3.012c0 .929.436 1.75 1.104 2.298a5.846 5.846 0 0 0-2.526 1.698A5.964 5.964 0 0 1 1.986 8 6.021 6.021 0 0 1 8 1.986zm-.035 4.02c1.097 0 1.988.892 1.988 2.012A1.988 1.988 0 0 1 8.03 10c-.029 0-.057-.006-.086-.006-.025 0-.049.005-.074.006a1.994 1.994 0 0 1-1.916-2.006c0-1.096.892-1.988 2.012-1.988zm-.096 4.992c.024.001.048.008.072.008h.024c.022 0 .04-.007.062-.008a4.84 4.84 0 0 1 3.643 1.752A5.963 5.963 0 0 1 8 14.014a5.965 5.965 0 0 1-3.742-1.31 4.848 4.848 0 0 1 3.611-1.706z'
											/>
										</svg>
									</button>
								</div>
								{isUserTabOpen && (
									<div
										className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
										role='menu'
										aria-orientation='vertical'
										aria-labelledby='user-menu-button'
										tabIndex={-1}>
										<Link
											to='/profile'
											className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
											role='menuitem'
											tabIndex={-1}
											id='user-menu-item-0'>
											Your Profile
										</Link>
										<div
											className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
											role='menuitem'
											tabIndex={-1}
											id='user-menu-item-2'
											onClick={() => TokenService.logout()}>
											Sign out
										</div>
									</div>
								)}
							</div>
						) : (
							<ul className='navbar-nav flex flex-col pl-0 list-style-none mr-auto'>
								<li className='nav-item p-2'>
									<a
										className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
										href='/register'>
										Register
									</a>
								</li>
								<li className='nav-item p-2'>
									<a
										className='nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
										href='/login'>
										Login
									</a>
								</li>
							</ul>
						)}
						{isCartOpen && (
							<div
								className='absolute right-0 top-10 h-96 w-128 xl:w-[32rem] bg-white rounded-lg shadow-lg p-4 CartContainer'
								style={{ height: "500px" }}
								ref={ref}>
								<h1 className='text-2xl font-bold text-black'>Cart</h1>
								<div className='flex justify-center'>
									<ul
										className='bg-white rounded-lg w-96 h-48  text-gray-900 overflow-y-auto cartScroll'
										style={{ height: "300px" }}>
										{cartItems.map((item, i) => (
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
															{item.name}

															{item.size && "(" + item.size + ")"}
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
														<button
															className='bg-gray-100 rounded-l-lg p-2'
															onClick={() => {
																if (item.quantity > 1) {
																	subtractQuantity({ ...item });
																}
															}}>
															<svg
																aria-hidden='true'
																focusable='false'
																data-prefix='fas'
																data-icon='minus'
																className='w-4'
																role='img'
																xmlns='http://www.w3.org/2000/svg'
																viewBox='0 0 448 512'>
																<path
																	fill='currentColor'
																	d='M416 256H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h384c17.67 0 32-14.33 32-32s-14.33-32-32-32z'></path>
															</svg>
														</button>
														<span className='bg-gray-100 text-gray-700 text-sm font-bold px-4 py-2'>
															{item.quantity}
														</span>
														<button
															className='bg-gray-100 rounded-r-lg p-2'
															onClick={() => {
																incrementQuantity({ ...item });
															}}>
															<svg
																aria-hidden='true'
																focusable='false'
																data-prefix='fas'
																data-icon='plus'
																className='w-4'
																role='img'
																xmlns='http://www.w3.org/2000/svg'
																viewBox='0 0 448 512'>
																<path
																	fill='currentColor'
																	d='M416 256H272v144c0 17.67-14.33 32-32 32s-32-14.33-32-32V256H32c-17.67 0-32-14.33-32-32s14.33-32 32-32h144V48c0-17.67 14.33-32 32-32s32 14.33 32 32v144h144c17.67 0 32 14.33 32 32s-14.33 32-32 32z'></path>
															</svg>
														</button>
													</div>
													<button
														className='bg-gray-100 rounded-lg p-2'
														onClick={() => {
															removeFromCart(item);
														}}>
														<svg
															aria-hidden='true'
															focusable='false'
															data-prefix='fas'
															data-icon='trash'
															className='w-4'
															role='img'
															xmlns='http://www.w3.org/2000/svg'
															viewBox='0 0 448 512'>
															<path
																fill='currentColor'
																d='M432 32H272l-9.4-18.7A24 24 0 0 0 238.1 0H209.9a24 24 0 0 0-22.5 13.3L176 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h16v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h16a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM96 80h256v16H96zm288 400H80V96h304z'></path>
														</svg>
													</button>
												</div>
											</li>
										))}
									</ul>
								</div>
								<div className='h-12 w-full static'>
									<div className='h-12 w-96 absolute xl:left-16' style={{ top: "355px" }}>
										<div className='flex justify-between items-center px-4 py-3 bg-gray-100'>
											<span className='text-gray-600'>Total:</span>
											<span className='text-gray-700 font-bold'>{cartTotal} €</span>
										</div>
										<div className='flex justify-between items-center px-4 py-3 bg-gray-100'>
											<button
												className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full'
												onClick={() => {
													clearCart();
												}}>
												Clear cart
											</button>
											<button
												className={
													"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-75"
												}
												data-bs-toggle='modal'
												data-bs-target='#exampleModalLg'
												title={cartItems.length === 0 ? "Cart is empty" : ""}
												disabled={cartItems.length === 0 ? true : false}>
												Checkout
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>
			<CheckoutModal />
		</>
	);
};

export default NavBar;
