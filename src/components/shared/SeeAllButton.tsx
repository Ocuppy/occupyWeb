import React from "react";
import { Button } from "../ui/button";

const SeeAllButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      variant={"link"}
      className="py-0 px-0 text-occupy-primary font-[900] text-[14px]"
      onClick={onClick}
    >
      See all
    </Button>
  );
};

export default SeeAllButton;
