import { useState } from "react";
import Flex from "@/components/shared/Flex";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Image, X } from "lucide-react";
import { productSchema, productSchemaType } from "@/lib/validations/addProductSchema";
import { MultiSelect } from "@/components/ui/multiSelect";

const AddProduct = () => {
  const form = useForm<productSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      tag: [],
    },
  });

  function onSubmit(values: productSchemaType) {
    console.log(values);
  }

  const frameworksList = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ];

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <Flex className="justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium text-[#333843] font-inter">Add Product</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/inventory">Product List</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Product</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Flex>
              <Button
                onClick={() => Router.push("/dashboard/inventory")}
                className="py-1 px-3 bg-transparent border text-[#5D6679]"
              >
                Cancel
              </Button>
              <Button className="py-1 px-3" type="submit">
                Save Product
              </Button>
            </Flex>
          </Flex>

          <Flex className="gap-6 items-start">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-3 shadow-md bg-white border border-slate-200 rounded-lg px-4 py-6">
                <h1 className="text-[#1A1C21] font-medium text-lg">General Information</h1>

                <FormField
                  control={form.control}
                  name="supermarket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supermarket Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#F9F9FC]">
                            <SelectValue placeholder="Select supermarket" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="laptop">Laptop</SelectItem>
                          <SelectItem value="fruit">Fruit</SelectItem>
                          <SelectItem value="vegetable">Vegetable</SelectItem>
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
                        <Input
                          {...field}
                          className="bg-[#F9F9FC]"
                          placeholder="Type product name here..."
                        />
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
                        <Textarea
                          className="bg-[#F9F9FC]"
                          {...field}
                          placeholder="Type product description here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 shadow-md bg-white border border-slate-200 rounded-lg px-4 py-6">
                <h1 className="text-[#1A1C21] font-medium text-lg">Media</h1>

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl className="bg-[#F9F9FC] rounded-lg border-dashed border-4 p-6">
                        <div className="flex flex-col gap-3 items-center justify-center">
                          <div className="bg-[#DEDEFA] p-2 rounded-full">
                            <Image className="text-occupy-primary" />
                          </div>
                          <span className="text-[#858D9D] font-normal text-sm">
                            Drag and drop image here, or click add image
                          </span>
                          <Button className="text-occupy-primary bg-[#DEDEFA] font-semibold">
                            Add Image
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 shadow-md bg-white border border-slate-200 rounded-lg px-4 py-6">
                <h1 className="text-[#1A1C21] font-medium text-lg">Pricing</h1>

                <Flex>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Basic Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#F9F9FC]"
                            placeholder="Type basic price here..."
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
                      <FormItem className="w-full">
                        <FormLabel>Quantity of Items</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#F9F9FC]"
                            placeholder="0"
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Flex>
              </div>
            </div>

            {/* Category form  */}
            <div className="flex flex-col gap-3 shadow-md bg-white border w-[264px] border-slate-200 rounded-lg px-4 py-6">
              <h1 className="text-[#1A1C21] font-medium text-lg">Category</h1>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#F9F9FC]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="fruit">Fruit</SelectItem>
                        <SelectItem value="vegetable">Vegetable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Tags</FormLabel>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select a tag"
                      variant="inverted"
                      animation={2}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Flex>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
