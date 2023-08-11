import Button from "@/components/ui/Button";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2>404 Page Not Found</h2>
        <h3 className="flex items-center justify-center">
          <span className="text-red-500 ml-2"> Not Found</span>
        </h3>
        <div className="flex items-center justify-center">
          <Button>Back To Home Page</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
