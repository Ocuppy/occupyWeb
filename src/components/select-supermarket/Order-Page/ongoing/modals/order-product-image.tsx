import { url } from "inspector";
import Image from "next/image";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function OrderProductImage({ image }: { image: string }) {
  const [showModal, setShowModal] = React.useState(false);

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div>
      <button onClick={toggleShowModal}>
        <img src={image} alt="" className="h-10 w-10 cursor-pointer" />
      </button>

      {showModal && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
          <div className="h-4/5 w-full max-w-4xl rounded-lg bg-white p-4">
            <div className="flex justify-end">
              <button onClick={toggleShowModal}>
                <MdClose size={32} />
              </button>
            </div>

            <div className="h-4/5">
              <img src={image} alt="" className="mx-auto h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
