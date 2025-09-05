import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import NextImage from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { useAppSelector } from "@/store/redux/hooks";
import { useAddProductMutation } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
import { useGetUserSupermarketsQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";

const productSchema = z.object({
  supermarket: z.string().min(1, "Supermarket is required"),
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  photo: z.instanceof(File).optional(),
  price: z.string().refine(
    (val) => {
      const numValue = parseFloat(val.replace(/,/g, ""));
      return !isNaN(numValue) && numValue >= 0;
    },
    {
      message: "Price must be a valid non-negative number",
    }
  ),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  in_stock: z.boolean().default(true),
  category: z.object({
    pk: z.string().min(1, "Category is required"),
    value: z.string(),
    label: z.string(),
  }),
  tag: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const baseUrl = "https://backend.occupyestate.com/api";

interface Category {
  id: number;
  category_image: string;
  category_name: string;
}

const TAGS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const AddProduct: React.FC = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const userID = useAppSelector((state) => state.auth.userID);

  const { data: supermarketsData } = useGetUserSupermarketsQuery(userID, { skip: !userID });
  const SUPERMARKETS = supermarketsData?.map((store: { id: string; name: string }) => ({
    value: store.id,
    label: store.name,
  })) || [];

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      supermarket: supermarket_id as string || "",
      productName: "",
      description: "",
      photo: undefined,
      price: "",
      quantity: 0,
      in_stock: true,
      category: { value: "", label: "", pk: "" },
      tag: [],
    },
  });

  const [categories, setCategories] = useState<
    Array<{ value: string; label: string; pk: string }>
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(`${baseUrl}/admin/list-categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data: Category[] = await response.json();

        const formattedCategories = data.map((category) => ({
          label: category.category_name,
          value: category.id.toString(),
          pk: category.id.toString(),
        }));

        setCategories(formattedCategories);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const [addProductMutation] = useAddProductMutation();

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("description", data.description || "");
      formData.append("category", data.category.pk);
      formData.append("price", data.price.replace(/,/g, ""));
      formData.append("quantity", data.quantity.toString());
      formData.append("in_stock", data.in_stock.toString());
      if (data.photo) formData.append("product_image", data.photo);

      const response = await addProductMutation({
        supermarket_id: data.supermarket,
        name: data.productName,
        description: data.description || "",
        category: data.category.pk,
        price: data.price.replace(/,/g, ""),
        quantity: data.quantity.toString(),
        in_stock: data.in_stock,
        product_image: data.photo,
      });

      if (response.data) {
        toast({
          title: "Success",
          description: "Product added successfully!",
          variant: "default",
        });
        router.push(`/select-supermarket/dashboard/${supermarket_id}`);
      } else {
        toast({
          title: "Error",
          description: "Failed to add product",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-medium text-gray-700">
                Add Product
              </h1>
              <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                Dashboard / Product List / Add Product
              </nav>
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">General Information</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="supermarket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supermarket</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Supermarket" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SUPERMARKETS.map((market: { value: string; label: string }) => (
                              <SelectItem key={market.value} value={market.value}>
                                {market.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Product description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Media</h2>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center w-full ${
                      previewImage ? 'h-auto' : 'h-40'
                    }`}
                  >
                    {previewImage ? (
                      <div className="relative w-full h-64">
                        <NextImage
                          src={previewImage}
                          alt="Product preview"
                          fill
                          className="object-contain rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
                          <ImageIcon width={24} height={24} className="text-gray-400" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <ImageIcon width={48} height={48} className="text-gray-400" />
                        <p>Drag and drop image here, or click to upload</p>
                        <p className="text-sm text-gray-500">Recommended size: 800x800px</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter price"
                            {...field}
                            onChange={(e) => {
                              let value = e.target.value.replace(/[^\d.,]/g, "");
                              const parts = value.split(".");
                              if (parts.length > 2) parts.pop();
                              value = parts.join(".");
                              field.onChange(value);
                            }}
                            onBlur={(e) => {
                              const value = e.target.value.replace(/,/g, "");
                              if (value) {
                                const numValue = parseFloat(value);
                                if (!isNaN(numValue)) {
                                  const formatted = numValue.toLocaleString(
                                    "en-US",
                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                                  );
                                  field.onChange(formatted);
                                }
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="in_stock"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>In Stock</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Category & Tags</h2>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = categories.find(c => c.value === value);
                          form.setValue("category", selected || { value: "", label: "", pk: "" });
                        }}
                        value={form.watch("category.value")}
                        disabled={loadingCategories}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select Category"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;