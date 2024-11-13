import { MouseEventHandler, useRef } from "react";
import CategoryCard from "./CategoryCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const { data: categoriesData, error, isLoading } = useGetCategoriesQuery("");

  const categories = [
    {
      title: "Diabetic Food",
      image: "/images/diabetic-food.png",
      link: "/diabetic-food",
    },
    {
      title: "Fresh Fruit",
      image: "/images/fresh-fruit.png",
    },
    {
      title: "Bread & Bakery",
      image: "/images/bread-bakery.png",
    },
    {
      title: "Fresh Vegetables",
      image: "/images/fresh-vegetables.png",
    },
    {
      title: "Baking Needs",
      image: "/images/baking-needs.png",
    },
    {
      title: "Meat & Fish",
      image: "/images/meat-fish.png",
    },
    { title: "Cooking", image: "/images/cooking.png" },
    {
      title: "Fresh Fruit",
      image: "/images/fresh-fruit.png",
    },
    {
      title: "Bread & Bakery",
      image: "/images/bread-bakery.png",
    },
    {
      title: "Fresh Vegetables",
      image: "/images/fresh-vegetables.png",
    },
    {
      title: "Fresh Fruit",
      image: "/images/fresh-fruit.png",
    },
    {
      title: "Bread & Bakery",
      image: "/images/bread-bakery.png",
    },
    {
      title: "Fresh Vegetables",
      image: "/images/fresh-vegetables.png",
    },
    {
      title: "Fresh Fruit",
      image: "/images/fresh-fruit.png",
    },
    {
      title: "Bread & Bakery",
      image: "/images/bread-bakery.png",
    },
    {
      title: "Fresh Vegetables",
      image: "/images/fresh-vegetables.png",
    },
  ];

  return (
    <div className="relative flex items-center p-5">
      <button
        className="absolute left-0 z-10 grid size-10 place-items-center rounded-full border border-[#E0E0E0] bg-white text-black shadow-md hover:bg-gray-100"
        onClick={scrollLeft}
      >
        <ArrowLeft size={20} />
      </button>
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex overflow-x-auto"
      >
        {categoriesData &&
          categoriesData.map(
            (
              category: { category_image: string; category_name: string },
              index: number,
            ) => (
              <CategoryCard
                key={`${index}-${category.category_name}`}
                image={category.category_image}
                title={category.category_name}
              />
            ),
          )}
      </div>
      <button
        className="absolute right-0 z-10 grid size-10 place-items-center rounded-full border border-[#E0E0E0] bg-white text-black shadow-md hover:bg-gray-100"
        onClick={scrollRight}
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
