import React from "react";
import useOutsideClick from "../../hooks/detectClick";
import { ICartItem } from "../../models/cart";
import { useToastContext } from "../context/ToastContext";


interface AddToCartToastProps {
	product: ICartItem;
}

const AddToCartToast: React.FC<AddToCartToastProps> = ({ product }) => {
	const { hideToast } = useToastContext();
	const toastRef = React.useRef<HTMLDivElement>(null);

	useOutsideClick([toastRef], hideToast);

	return (
		<div
			className='fixed top-24 left-0 xl:left-1/3 xl:w-1/3 z-50  w-full h-64 bg-white shadow-xl mx-auto text-sm pointer-events-auto bg-clip-padding rounded-lg transform transition-all duration-600 ease-in-out border-2 border-gray-300 shadow-lg opacity-100 shadow-black'
			id='static-example'
			role='alert'
			ref={toastRef}
			aria-live='assertive'
			aria-atomic='true'
			aria-hidden='true'
			data-mdb-autohide='true'>
			<div className=' bg-white flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-gray-200 rounded-t-lg'>
				<p className='font-bold text-gray-500 first-letter:uppercase'>
					{product.name} added to cart
				</p>
				<div className='flex items-center'>
					<button
						type='button'
						className=' btn-close box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
						data-mdb-dismiss='toast'
						aria-label='Close'
						onClick={() => {
							hideToast();
						}}></button>
				</div>
			</div>
			<div className='p-3 bg-white rounded-b-lg break-words text-gray-700 w-full h-3/4 flex flex-col justify-between'>
				<div className=''>
					<ul className='bg-white rounded-lg h-full w-full text-gray-900 overflow-y-auto'>
						<li className='flex justify-between items-center p-4 border-b border-solid'>
							<div className='flex items-center'>
								<img
									className='h-16 w-16 rounded-lg'
									src={process.env.PUBLIC_URL + "/images/" + product.imageName}
									alt={product.name}
								/>
								<div className='flex flex-col ml-4'>
									<span className='font-bold first-letter:uppercase'>
										{product.name} {product.size ? `(${product.size})` : ""}
									</span>
									<span className='text-sm text-gray-500'>
										{product.price} € x {product.quantity}
									</span>
								</div>
								<div className='flex items-center'></div>
							</div>
							<div className='flex items-center'>
								<div
									className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg mr-5'
									role='group'>
									<span className='bg-gray-100 text-gray-700 text-sm font-bold px-4 py-2'>
										{product.quantity}
									</span>
								</div>
							</div>
						</li>
					</ul>
					<div className=''>
						<span className='font-bold text-gray-500'>
							Total: {product.price * product.quantity} €
						</span>
					</div>
				</div>
				<div className='flex justify-between items-center mt-5'>
					<button
						type='button'
						className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-1'
						aria-label='Close'
						onClick={() => {
							hideToast();
						}}>
						Continue shopping
					</button>
					<button
						type='button'
						className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-1'
						data-bs-toggle='modal'
						data-bs-target='#exampleModalLg'
						aria-label='Close'
						onClick={() => {
							hideToast();
						}}>
						Go to checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddToCartToast;
