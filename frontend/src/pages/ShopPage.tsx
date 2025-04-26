import React from "react";
import ProductCard from "../components/product/productCard";
import ProductCarousel from "../components/carousel/productcarousel";
import productService from "../services/product.service";
import { useCart } from "../components/context/CartContext";

const ShopPage: React.FC = () => {
	const [FanProducts, setFanProducts] = React.useState([]);
	const { RefreshCart } = useCart()

	React.useEffect(() => {
		productService
			.getAllProducts()
			.then((res) => {
				setFanProducts(res.data);
			})
			.catch();
		RefreshCart()
	}, []);
	return (
		<>
			<div className='fullpageimgContainer static' >
				<div className='fullpageimg'>
					<div className='text-align-left absolute top-1/3 left-40 fullpageimgtext'>
						<h1 className='text-7xl font-bold text-white '>88 Shop</h1>
						<p className='text-2xl text-white pt-5'>Welcome to our shop</p>

						<p className='text-2xl text-white'>We have a wide range of products</p>
						<p className='text-2xl text-white pb-5'>Please take a look</p>
						<a href='#Products'>
							<button className='bg-white text-black font-bold py-2 px-4 rounded Mainbutton'>
								Shop Now
							</button>
						</a>
					</div>
					<div className='pb-5'>
						<p className='text-l text-white text-align-center pb-1'>
							Scroll down to see our products
						</p>

						<div className='flex justify-center'>
							<svg
								className='animate-bounce'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 5V19'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M19 12L12 19L5 12'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className='mb-5'>
					<h1 className='text-4xl text-black mt-10 indent-10' id='Products'>
						Featured Products
					</h1>
					<ProductCarousel />
				</div>
				<h3 className='text-4xl text-black mt-10 mb-10 indent-10' id='Products'>
					Products
				</h3>
				<div className='flex items-center justify-center w-full h-full flex-wrap'>
					{FanProducts?.map((product, index) => {
						return <ProductCard key={index} product={product} />;
					})}
				</div>
			</div>
		</>
	);
};

export default ShopPage;
