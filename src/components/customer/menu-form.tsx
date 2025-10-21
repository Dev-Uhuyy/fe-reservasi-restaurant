"use client";

import React from "react";
import OrderCard from "./order-card";
import { ReservationData } from "@/app/data/customer/reservation";
import { useState } from "react";
import { ReservationProduct } from "@/app/interface/customer/reservation";
import { Product } from "@/app/interface/customer/menu";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { IdentityFormData } from "@/app/interface/customer/reservation";

interface MenuFormProps {
  order: ReservationProduct[];
  formData: IdentityFormData;
  setOrder: React.Dispatch<React.SetStateAction<ReservationProduct[]>>;
}

type MenuItem = (typeof ReservationData.menu)[0];

function MenuForm({ order, setOrder, formData }: MenuFormProps) {
  const [activeCategory, setActiveCategory] = useState(
    ReservationData.categories[0]
  );

  const handleUpdateQuantity = (menuItem: MenuItem, newQuantity: number) => {
    setOrder((currentOrder) => {
      const existingItemIndex = currentOrder.findIndex(
        (item) => item.product_id === menuItem.id
      );

      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        return currentOrder.filter((item) => item.product_id !== menuItem.id);
      }

      if (existingItemIndex > -1) {
        const updatedOrder = [...currentOrder];
        const existingItem = updatedOrder[existingItemIndex];

        updatedOrder[existingItemIndex] = {
          ...existingItem,
          qty: newQuantity,
          subtotal: (existingItem.product?.price ?? 0) * newQuantity,
        };
        return updatedOrder;
      } else {
        // Add new item to order, constructing a valid `Product` object
        const newProduct: Product = {
          id: menuItem.id,
          category_id:
            ReservationData.categories.indexOf(menuItem.category) + 1,
          name: menuItem.name,
          image_url: menuItem.image_url,
          price: menuItem.price,
          description: menuItem.description,
          stock: menuItem.stock,
          unit: menuItem.unit,
          status: menuItem.status,
          category: {
            id: ReservationData.categories.indexOf(menuItem.category) + 1,
            name: menuItem.category,
          },
        };

        const newOrderItem: ReservationProduct = {
          id: 0, // This would be set by the backend
          reservation_id: 0, // This would be set by the backend
          product_id: menuItem.id,
          qty: newQuantity,
          subtotal: menuItem.price * newQuantity,
          product: newProduct,
        };
        return [...currentOrder, newOrderItem];
      }
    });
  };

  const filteredMenu = ReservationData.menu.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="w-full max-w-8xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-14 lg:gap-6">
      <div className="lg:col-span-2">
        {/* Sidebar */}
        <Card>
          <CardTitle className="w-full text-center">CATEGORIES</CardTitle>

          <CardContent className="flex flex-col gap-2">
            {ReservationData.categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full justify-start px-2 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow"
                    : "bg-transparent text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Menu Grid */}
      <ScrollArea className="lg:col-span-8 h-[calc(100vh-8rem)]">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:gap-4">
          {filteredMenu.map((item) => {
            const orderItem = order.find((oi) => oi.product_id === item.id);
            const quantity = orderItem ? orderItem.qty : 0;
            return (
              <Card key={item.id} className="mb-0 pb-0 h-max">
                <CardContent className="p-0">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-sm text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.price.toLocaleString()}
                      </p>
                    </div>
                    {quantity > 0 ? (
                      <div className="flex items-center justify-between mt-4">
                        <Button
                          onClick={() =>
                            handleUpdateQuantity(item, quantity - 1)
                          }
                          variant="secondary"
                        >
                          -
                        </Button>
                        <span className="font-bold text-lg">{quantity}</span>
                        <Button
                          onClick={() =>
                            handleUpdateQuantity(item, quantity + 1)
                          }
                          variant="secondary"
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-4 mb-0 w-full">
                        <Button
                          onClick={() => handleUpdateQuantity(item, 1)}
                          variant="secondary"
                          className="w-full"
                        >
                          Add to Dish
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Order Summary on the right */}
      <div className="lg:col-span-4">
        <OrderCard order={order} formData={formData}/>
      </div>
    </div>
  );
}

export default MenuForm;
