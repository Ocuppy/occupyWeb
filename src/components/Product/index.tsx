// import React from "react";
// import Image from "next/image";
// import { FaPen, FaPencilAlt, FaStore } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useDeleteProductMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

// interface ProductCardProps {
//   product: {
//     in_stock: boolean;
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
//   // Add debug logs
//   console.log("Product category ID:", product.category);
//   console.log("Available categories:", categories);

//   const categoryName =
//     categories.find((cat) => cat.id.toString() === product.category.toString())
//       ?.category_name || "Unknown Category";

//   console.log("Found category name:", categoryName);

//   return (
//     <div
//       className="mx-auto flex w-[300px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl xl:w-[250px]"
//       // className="flex w-[250px] cursor-pointer flex-col rounded-lg bg-slate-50 p-4 shadow-md hover:w-[260px]"
//       onClick={onClickProduct}
//     >
//       <div className="w-full rounded-md">
//         {product.product_image ? (
//           <Image
//             src={product.product_image}
//             alt={`${product.name} logo`}
//             width={100}
//             height={50}
//             priority
//             className="h-[200px] w-full rounded-2xl object-cover"
//           />
//         ) : (
//           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
//             <FaStore className="text-gray-500" />
//           </div>
//         )}
//       </div>
//       <div className="p-1">
//         <div className="flex flex-col">
//           <div className="py-1">
//             <h1 className="text-2xl font-semibold">{product.name}</h1>
//           </div>
//           {product.in_stock ? (
//             <span className="rounded-full bg-[#a0ff8e] p-4 text-green-600">
//               In Stock
//             </span>
//           ) : (
//             <span className="w-[100px] rounded-full bg-[#e9b5b5] px-3 py-1.5 text-center text-[12px] text-red-500">
//               Out of Stock
//             </span>
//           )}
//           <p className="text-lg text-gray-500">{product.description}</p>
//           <div className="flex items-center justify-between">
//             <p className="text-lg font-semibold text-purple-500">
//               {categoryName}
//             </p>
//             <p className="text-lg text-gray-500">Quantity:{product.quantity}</p>
//           </div>
//           <p className="py-4 text-2xl font-bold text-gray-700">
//             ₦
//             {parseFloat(product.price.replace(/,/g, "")).toLocaleString(
//               "en-US",
//             )}
//           </p>
//           {/* <button className="h-[50px] w-full rounded-full bg-green-500 py-2 text-xl font-semibold text-white">
//             Add to Cart
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import Image from "next/image";
import { Store, Edit, Trash2, Package, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: {
    in_stock: boolean;
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
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  onClickProduct,
  onEdit,
  onDelete,
}) => {
  const categoryName =
    categories.find((cat) => cat.id.toString() === product.category.toString())
      ?.category_name || "Unknown Category";

  const formatPrice = (price: string) => {
    return parseFloat(price.replace(/,/g, "")).toLocaleString("en-US");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg sm:w-[300px]">
      <div className="absolute right-2 top-2 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white/90 hover:bg-white"
          onClick={handleEdit}
        >
          <Edit className="absolute h-4 w-4 text-blue-600" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-white/90 hover:bg-white"
          onClick={handleDelete}
        >
          <Trash2 className="absolute h-4 w-4 text-red-600" />
        </Button>
      </div>

      <div
        className="relative aspect-square w-full cursor-pointer"
        onClick={onClickProduct}
      >
        {product.product_image ? (
          <Image
            src={product.product_image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Store className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-semibold">{product.name}</h3>
          <Badge
            variant={product.in_stock ? "approved" : "destructive"}
            className="whitespace-nowrap"
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Package className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-purple-500">{categoryName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-semibold text-gray-700">
              ₦{formatPrice(product.price)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-500">
            Quantity: {product.quantity}
          </span>
          <Button variant="outline" size="sm" onClick={onClickProduct}>
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
