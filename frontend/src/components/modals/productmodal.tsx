import React from "react";
import { IProduct } from "../../models/product";
import productService, { ISize } from "../../services/product.service";
import { useCart } from "../context/CartContext";

interface IProductCardProps {
	product: IProduct;
}

const ProductModal: React.FC<IProductCardProps> = ({ product }) => {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = React.useState(1);
	const [stock, setStock] = React.useState<{ id: number; max?: number }>();
	const [sizes, setSizes] = React.useState<ISize[]>([]);
	const [disabled, setDisabled] = React.useState<boolean>(false);
	const selectInput = React.useRef<HTMLSelectElement>(null);
	const modalRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (selectInput.current?.value === "") {
			setDisabled(true);
		} else {
			setStock({
				id: Number(selectInput.current?.value),
				max: sizes.find((s) => s.id === Number(selectInput.current?.value))?.stock,
			});
			setDisabled(false);
		}

		const handleOpenModal = () => {
			productService
				.getSizesForProduct(product.id)
				.then((res) => {
					if (selectInput.current) {
						setStock({
							id: Number(selectInput.current.value),
							max: res.data.find((s) => s.id === stock?.id)?.stock,
						});
					} else {
						setStock({
							id: res.data[0].id,
							max: res.data.find((s) => s.id === res.data[0].id)?.stock,
						});
					}
					setSizes(res.data);
				})
				.catch(() => { });
		};

		if (modalRef.current) {
			modalRef.current.addEventListener("shown.bs.modal", handleOpenModal);
		}
		return () => {
			if (modalRef.current) {
				modalRef.current.removeEventListener("shown.bs.modal", handleOpenModal);
			}
		};
	}, [product.id, selectInput.current?.value]);

	const handleAddToCart = () => {
		if (!stock) {
			setDisabled(true);
			return;
		} else {
			const sizename = sizes?.find((s) => stock.id === s.id)?.size;
			addToCart({
				...product,
				quantity,
				size: sizename,
				size_id: stock.id,
				max_quantity: stock.max,
				cart_item_id: null,
			});
			setDisabled(false);
			setQuantity(1);
		}
	};

	return (
		<div
			className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
			id={"modal" + product.id}
			tabIndex={-1}
			aria-hidden='true'
			aria-modal='true'
			ref={modalRef}
			role='dialog'>
			<div className='modal-dialog modal-xl relative w-auto pointer-events-none'>
				<div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
					<div className='modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
						<h5
							className='text-xl font-medium leading-normal text-gray-800 first-letter:uppercase'
							id='exampleModalXlLabel'>
							{product.name}
						</h5>
						<button
							type='button'
							className='btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body relative p-4'>
						<div className='flex flex-col lg:flex-row '>
							<div className='flex flex-col w-full lg:w-1/2'>
								<div className='flex flex-col w-full'>
									<img
										src={process.env.PUBLIC_URL + "/images/" + product.imageName}
										className='w-full rounded-lg'
										alt={product.name}
										loading='lazy'
									/>
								</div>
							</div>
							<div className='flex w-full lg:w-1/2 justify-center align-center'>
								<div className='flex flex-col justify-center align-center w-2/3 sm:mt-12'>
									<div className='flex flex-row w-full justify-between border-b border-gray-200 w-full'>
										<h1 className='text-2xl font-medium leading-normal text-gray-800 first-letter:uppercase'>
											{product.name}
										</h1>
										<h2 className='text-xl font-medium leading-normal text-gray-800 mr-2 p-0'>
											{product.price} €
										</h2>
									</div>
									<div className='flex flex-row w-full my-4'>
										<h3 className='text-xl font-medium leading-normal text-gray-800 w-full first-letter:uppercase'>
											{product.description}
										</h3>
									</div>
									<div className='modal-footer flex flex-col flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
										{product.sizeable ? (
											<div className='flex flex-row w-full'>
												{sizes.map((size) => {
													return (
														<div
															key={size.size}
															className='flex items-center justify-center w-20 h-10 border border-gray-300 rounded-md mr-2'>
															<div className='text-gray-800 font-bold'>{size.size}</div>
															<div className='text-gray-500 text-sm ml-1'>
																x {size.stock}
															</div>
														</div>
													);
												})}
											</div>
										) : null}

										{product.sizeable ? (
											<select
												className='form-select form-select-sm appearance-none block w-full px-2 py-1 my-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
												aria-label='.form-select-sm example'
												onChange={(e) => setStock({ id: Number(e.target.value) })}
												ref={selectInput}>
												<option defaultChecked={true} value=''>
													Select size
												</option>
												{sizes.map((size) => {
													return (
														<option value={size.id} key={size.id}>
															{size.size}
														</option>
													);
												})}
												{sizes.length === 0 ? (
													<option value='' className='disabled ' disabled>
														No sizes available
													</option>
												) : null}
											</select>
										) : null}
										<div className='flex items-center justify-center '>
											<div
												className={`inline-flex shadow-md hover:shadow-lg focus:shadow-lg ${disabled
														? "opacity-50 cursor-not-allowed pointer-events-none "
														: ""
													}`}
												role='group'>
												<button
													type='button'
													className='rounded-l inline-block px-3 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
													onClick={() =>
														quantity > 1 ? setQuantity(quantity - 1) : null
													}>
													-
												</button>
												<div className=' inline-block px-3 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'>
													{quantity}
												</div>
												<button
													type='button'
													className=' rounded-r inline-block px-3 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out'
													onClick={() =>
														quantity < (stock?.max || 0)
															? setQuantity(quantity + 1)
															: null
													}>
													+
												</button>
											</div>
										</div>
										<div className='flex items-center justify-center'>
											<span
												className='inline-block'
												title={disabled ? "Please select size" : ""}>
												<button
													type='button'
													className={`rounded-l block px-6 py-2.5 my-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out ${disabled
															? "opacity-50 cursor-not-allowed pointer-events-none "
															: ""
														}`}
													onClick={handleAddToCart}
													data-bs-dismiss='modal'
													aria-label='Close'>
													Add to cart <span>•</span> {product.price * quantity} € (
													{quantity})
												</button>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductModal;
