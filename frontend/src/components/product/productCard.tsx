import React from "react";
import { IProduct } from "../../models/product";

interface IProductCardProps {
	product: IProduct;
}

const LazyModal = React.lazy(() => import("../modals/productmodal"));

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
	return (
		<>
			<div
				className='group relative mx-3 my-5 productcard'
				data-bs-toggle={"modal"}
				data-bs-target={"#modal" + product.id}>
				<div className='min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-95 lg:aspect-none lg:h-80  productcardImg'>
					<img
						src={process.env.PUBLIC_URL + "/images/" + product.imageName}
						className='h-full w-full object-cover object-center lg:h-full lg:w-full'
						loading='lazy'
					/>
				</div>
				<div className='mt-4 flex justify-between'>
					<div>
						<h3 className='text-sm text-gray-700 productcardText first-letter:uppercase'>
							{product.name}
						</h3>
						<p className='text-sm font-medium text-gray-900 productcardText'>
							{product.price} €
						</p>
					</div>
				</div>
			</div>
			<LazyModal product={product} />
		</>
	);
};
export default ProductCard;
