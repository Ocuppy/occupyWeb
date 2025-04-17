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
import { FaPen, FaPencilAlt, FaStore } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDeleteProductMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

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
    in_stock: boolean; // <-- Ensure it's not optional
    image?: string;
  };
  categories: Array<{
    id: number;
    category_name: string;
    category_image: string;
  }>;
  onClickProduct: () => void;
  onDeleteProduct: (productId: string) => void;
  onEditProduct: (productId: string) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  onClickProduct,
  onDeleteProduct,
  onEditProduct,
}) => {
  // Add debug logs
  // console.log("Product category ID:", product.category);
  // console.log("Available categories:", categories);

  const categoryName =
    categories.find((cat) => cat.id.toString() === product.category.toString())
      ?.category_name || "Unknown Category";

  // console.log("Found category name:", categoryName);

  return (
    <div
      className="flex w-full flex-col rounded-lg bg-white p-2 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      // className="flex w-[250px] cursor-pointer flex-col rounded-lg bg-slate-50 p-4 shadow-md hover:w-[260px]"
      onClick={onClickProduct}
    >
      <div className="w-full rounded-md">
        {product.product_image ? (
          <Image
            src={product.product_image}
            alt={`${product.name} logo`}
            width={100}
            height={50}
            priority
            className="h-[200px] w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <FaStore className="text-gray-500" />
          </div>
        )}
      </div>
      <div className="px-2 py-4 pb-0">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-purple-500">
            {categoryName}
          </p>

          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-medium">{product.name}</h1>
            {product.in_stock ? (
              <span className="rounded-full bg-[#a0ff8e] px-2 py-1 text-[7px] lg:text-xs text-green-600">
                In Stock
              </span>
            ) : (
              <span className="rounded-full bg-[#e9b5b5] px-2 py-1 text-[7px] lg:text-xs text-red-600">
                Out of Stock
              </span>
            )}
          </div>
          <p className="text-base text-gray-400">{product.description}</p>

          <p className="text-lg font-semibold text-gray-500">
            Quantity: <span className="font-normal">{product.quantity}</span>
          </p>
          <p className="py-4 text-2xl font-bold text-gray-700">
            ₦
            {parseFloat(product.price.replace(/,/g, "")).toLocaleString(
              "en-US",
            )}
          </p>
          <div className="flex w-full items-center">
            <button
              className="flex w-1/2 items-center justify-center p-3 hover:bg-gray-300"
              onClick={() => onEditProduct(product.id)}
            >
              <FaPencilAlt size={20} />
            </button>
            <button
              className="flex w-1/2 place-items-center items-center justify-center p-3 hover:bg-red-200"
              onClick={() => onDeleteProduct(product.id)}
            >
              <MdDelete color="red" size={20} />
            </button>
          </div>

          {/* <button className="h-[50px] w-full rounded-full bg-green-500 py-2 text-xl font-semibold text-white">
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
