"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function Badge() {
  return (
    <div className="mb-12 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span className="font-medium text-[0.7rem]">clyne.app</span>
      </HoverBorderGradient>
    </div>
  );
}