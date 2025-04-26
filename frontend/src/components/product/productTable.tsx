import React from "react";
import { ICartItem } from "../../models/cart";
import { IOrder } from "../../pages/ProfilePage";

interface IProductTable {
	product: ICartItem;
}

interface IOrderTable {
	order: IOrder;
}

const OrderTable: React.FC<IOrderTable> = ({ order }) => {
	const [show, setShow] = React.useState(false);
	const orderDate = new Date(order.created_at).toLocaleDateString();
	return (
		<>
			<tr className='border-b bg-neutral-100'>
				<td className='px-6 py-4' onClick={() => setShow(!show)}>
					{
						show ? (
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						) : (
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 15l7-7 7 7'
								/>
							</svg>
						)
					}
				</td>
				<td className='px-6 py-4'>{orderDate}</td>
				<td className='px-6 py-4'>{order.status}</td>
				<td className='px-6 py-4'>
					{order.ordered_items.reduce(
						(acc: number, item: ICartItem) => acc + item.quantity * item.price,
						0
					)}{" "}
					€
				</td>
			</tr>
			{show && (
				<tr>
					<td colSpan={4}>
						<div className='flex flex-col'>
							<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'></div>
							<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
								<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
									<table className='min-w-full divide-y divide-gray-200'>
										<thead className='bg-gray-50'>
											<tr>
												<th
													scope='col'
													className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													Product
												</th>
												<th
													scope='col'
													className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													Price
												</th>
												<th
													scope='col'
													className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													Quantity
												</th>
												<th
													scope='col'
													className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
													Total
												</th>
											</tr>
										</thead>

										<tbody className='bg-white divide-y divide-gray-200'>
											{order.ordered_items.map((item, i) => (
												<ProductTableRow product={item} key={i} />
											))}
											<tr>
												<td
													className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'
													colSpan={3}>
													Total
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
													{order.ordered_items.reduce(
														(acc: number, item: ICartItem) =>
															acc + item.quantity * item.price,
														0
													)}{" "}
													€
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</td>
				</tr>
			)}
		</>
	);
};

export const ProductTableRow: React.FC<IProductTable> = ({ product }) => {
	return (
		<tr>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='flex items-center'>
					<div className='flex-shrink-0 h-10 w-10'>
						<img
							className='h-10 w-10 rounded-full'
							src={process.env.PUBLIC_URL + "/images/" + product.imageName}
							alt=''
							loading='lazy'
						/>
					</div>
				</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='text-sm text-gray-900'>{product.price} €</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap'>
				<div className='text-sm text-gray-900'>{product.quantity}</div>
			</td>
			<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
				{product.quantity * product.price} €
			</td>
		</tr>
	);
};

export default OrderTable;
