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
import {
  productSchema,
  productSchemaType,
} from "@/lib/validations/addProductSchema";
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
              <h1 className="font-inter text-2xl font-medium text-[#333843]">
                Add Product
              </h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/inventory">
                      Product List
                    </BreadcrumbLink>
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
                className="border bg-transparent px-3 py-1 text-[#5D6679]"
              >
                Cancel
              </Button>
              <Button className="px-3 py-1" type="submit">
                Save Product
              </Button>
            </Flex>
          </Flex>

          <Flex className="items-start gap-6">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-md">
                <h1 className="text-lg font-medium text-[#1A1C21]">
                  General Information
                </h1>

                <FormField
                  control={form.control}
                  name="supermarket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supermarket Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-md">
                <h1 className="text-lg font-medium text-[#1A1C21]">Media</h1>

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
                      <FormControl className="rounded-lg border-4 border-dashed bg-[#F9F9FC] p-6">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="rounded-full bg-[#DEDEFA] p-2">
                            {/* <Image src="" alt="" className="text-occupy-primary" /> */}
                          </div>
                          <span className="text-sm font-normal text-[#858D9D]">
                            Drag and drop image here, or click add image
                          </span>
                          <Button className="bg-[#DEDEFA] font-semibold text-occupy-primary">
                            Add Image
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-md">
                <h1 className="text-lg font-medium text-[#1A1C21]">Pricing</h1>

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
            <div className="flex w-[264px] flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-6 shadow-md">
              <h1 className="text-lg font-medium text-[#1A1C21]">Category</h1>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
