import React from "react";
// import { useRouter } from "next/router";
import { FaStore } from "react-icons/fa";
import Image from "next/image";
// import { useGetProductsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    product_image: string;
    category: string;
    supermarket_id: string;
    price: number;
    quantity: number;
    image?: string;
  };

  onClickProduct: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClickProduct,
}) => {
  return (
    <div
      className="flex h-[150px] cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-gray-100"
      onClick={onClickProduct}
    >
      <div className="flex items-center justify-between">
        <h1>{product.category}</h1>
        <p>{product.quantity}</p>
      </div>
      <div className="mx-4 flex items-center justify-between">
        {/* Product Photo */}
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} logo`}
            width={100}
            height={50}
            // className= object-cover"
            // className="rounded-full"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <FaStore className="text-gray-500" />
          </div>
        )}
        <div className="ml-4 flex flex-col">
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// const ProductCard = () => {
//   const router = useRouter();
//   const { id, supermarket_id } = router.query;

//   // Fetch the product details
//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useGetProductsQuery({
//     supermarket_id,
//     product_id: id,
//   });

//   if (isLoading) return <div>Loading product details...</div>;
//   if (error) return <div>Failed to load product details</div>;

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
//       <Image
//         src={product.image || "/placeholder.png"} // Fallback to placeholder if no image
//         alt={product.name}
//         width={300}
//         height={256}
//         className="mb-4 h-64 w-full rounded-lg object-cover"
//       />
//       <h1 className="text-2xl font-semibold">{product.name}</h1>
//       <p className="mt-2 text-gray-600">{product.description}</p>
//       <div className="mt-4">
//         <p>
//           <strong>Category:</strong> {product.category}
//         </p>
//         <p>
//           <strong>Price:</strong> ${product.price}
//         </p>
//         <p>
//           <strong>Quantity:</strong> {product.quantity}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
