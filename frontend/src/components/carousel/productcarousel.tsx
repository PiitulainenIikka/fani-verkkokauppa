import React from "react";
import { IProduct } from "../../models/product";
import productService from "../../services/product.service";

const ProductCarousel: React.FC = () => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [carouselItems, setCarouselItems] = React.useState([]);

	const scroll = (direction: "forward" | "backward") => {
		if (carouselRef.current) {
			if (direction === "forward") {
				carouselRef.current.scrollBy({
					left: carouselRef.current.clientWidth,
					behavior: "smooth",
				});
			} else {
				carouselRef.current.scrollBy({
					left: -carouselRef.current.clientWidth,
					behavior: "smooth",
				});
			}
		}
	};

	React.useEffect(() => {
		productService
			.getRandomProducts()
			.then((res) => {
				setCarouselItems(res.data);
			})
			.catch(() => {});
	}, []);

	return (
		<div className='flex justify-center align-center items-center'>
			<svg
				className='w-10 h-10 absolute left-5 bg-slate-400 rounded-full cursor-pointer hover:bg-gray-200 z-10 p-2'
				onClick={() => {
					scroll("backward");
				}}
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M15 19l-7-7 7-7'
				/>
			</svg>
			<div
				className='flex overflow-x-scroll shadow-lg productCarousel gap-1 w-11/12	h-full'
				ref={carouselRef}>
				{carouselItems?.map((product: IProduct) => (
					<div
						className='group w-full oneProduct relative'
						key={product.id}
						data-bs-toggle={"modal"}
						data-bs-target={"#modal" + product.id}>
						<div className='bg-white rounded-lg shadow-lg w-96'>
							<div className='min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-95 productcardImg'>
								<img
									src={process.env.PUBLIC_URL + "/images/" + product.imageName}
									className='h-full w-full object-cover object-center lg:h-full lg:w-full'
									loading='lazy'></img>
							</div>
						</div>
					</div>
				))}
			</div>
			<svg
				className='w-10 h-10 absolute right-5 bg-slate-400 rounded-full cursor-pointer hover:bg-gray-200 z-10 p-2'
				onClick={() => {
					scroll("forward");
				}}
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M9 5l7 7-7 7'
				/>
			</svg>
		</div>
	);
};

export default ProductCarousel;
