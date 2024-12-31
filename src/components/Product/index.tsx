// import React from "react";
// // import { useRouter } from "next/router";
// import { FaStore } from "react-icons/fa";
// import Image from "next/image";
// // import { useGetProductsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

// // interface ProductCardProps {
// //   product: {
// //     id: string;
// //     name: string;
// //     description: string;
// //     product_image: string;
// //     category: string;
// //     supermarket_id: string;
// //     price: string;
// //     quantity: number;
// //     image?: string;
// //   };

// //   onClickProduct: () => void;
// // }

// interface ProductCardProps {
//   product: {
//     id: string;
//     name: string;
//     description: string;
//     product_image: string;
//     category: string; // Add this field
//     supermarket_id: string;
//     price: string; // Add this field
//     quantity: number;
//     image?: string;
//   };
//   onClickProduct: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   onClickProduct,
// }) => {
//   return (
//     <div
//       className="flex h-[280px] cursor-pointer flex-col rounded-lg border p-4 hover:bg-gray-100"
//       onClick={onClickProduct}
//     >
//       {/* Product Photo */}
//       <div className="w-full">
//         {product.product_image ? (
//           <Image
//             src={product.product_image}
//             alt={`${product.name} logo`}
//             width={100}
//             height={50}
//             priority
//             // className= object-cover"
//             className="h-[25vh] w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
//             <FaStore className="text-gray-500" />
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <div className="ml-4 flex flex-col">
//           <h1 className="text-2xl font-semibold">{product.name}</h1>
//           <p className="text-lg text-gray-500">{product.description}</p>
//           <p className="text-lg text-gray-500">{product.category}</p>
//           {/* <p className="text-lg font-bold text-gray-700">${product.price}</p> */}
//           {/* Display the price */}
//           <p className="text-lg font-bold text-gray-700">
//             $
//             {parseFloat(product.price.replace(/,/g, "")).toLocaleString(
//               "en-US",
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React from "react";
// import Image from "next/image";
// import { FaStore } from "react-icons/fa";

// interface ProductCardProps {
//   product: {
//     id: string;
//     name: string;
//     description: string;
//     product_image: string;
//     category: string;
//     supermarket_id: string;
//     price: string;
//     quantity: number;
//     image?: string;
//   };
//   categories: Array<{
//     id: number;
//     category_name: string;
//     category_image: string;
//   }>;
//   onClickProduct: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//   product,
//   categories,
//   onClickProduct,
// }) => {
//   // Find the category name using the product's category ID
//   const categoryName =
//     categories.find((cat) => cat.id.toString() === product.category)
//       ?.category_name || "Unknown Category";

//   return (
//     <div
//       className="flex h-[280px] cursor-pointer flex-col rounded-lg border p-4 hover:bg-gray-100"
//       onClick={onClickProduct}
//     >
//       <div className="w-full">
//         {product.product_image ? (
//           <Image
//             src={product.product_image}
//             alt={`${product.name} logo`}
//             width={100}
//             height={50}
//             priority
//             className="h-[25vh] w-full object-cover"
//           />
//         ) : (
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
//             <FaStore className="text-gray-500" />
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <div className="ml-4 flex flex-col">
//           <h1 className="text-2xl font-semibold">{product.name}</h1>
//           <p className="text-lg text-gray-500">{product.description}</p>
//           <p className="text-lg text-gray-500">{categoryName}</p>
//           <p className="text-lg font-bold text-gray-700">
//             $
//             {parseFloat(product.price.replace(/,/g, "")).toLocaleString(
//               "en-US",
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import Image from "next/image";
import { FaStore } from "react-icons/fa";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    product_image: string;
    category: string;
    supermarket_id: string;
    price: string;
    quantity: number;
    image?: string;
  };
  categories: Array<{
    id: number;
    category_name: string;
    category_image: string;
  }>;
  onClickProduct: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  onClickProduct,
}) => {
  // Add debug logs
  console.log("Product category ID:", product.category);
  console.log("Available categories:", categories);

  const categoryName =
    categories.find((cat) => cat.id.toString() === product.category.toString())
      ?.category_name || "Unknown Category";

  console.log("Found category name:", categoryName);

  return (
    <div
      className="flex h-[300px] cursor-pointer flex-col rounded-lg border p-4 hover:bg-gray-100"
      onClick={onClickProduct}
    >
      <div className="w-full">
        {product.product_image ? (
          <Image
            src={product.product_image}
            alt={`${product.name} logo`}
            width={100}
            height={50}
            priority
            className="h-[25vh] w-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <FaStore className="text-gray-500" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="ml-4 flex flex-col">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-lg text-gray-500">{product.description}</p>
          <p className="text-lg text-purple-500">{categoryName}</p>
          <p className="text-lg font-bold text-gray-700">
            $
            {parseFloat(product.price.replace(/,/g, "")).toLocaleString(
              "en-US",
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
