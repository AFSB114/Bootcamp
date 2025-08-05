import Image from "next/image";
import Modal from "./Modal";
import { Attributes } from "@/types/card.type";
import { useState } from "react";

const Sphere = ({
  className,
  attribute,
  handleChangeAttribute,
}: {
  className?: string;
  attribute: Attributes;
  handleChangeAttribute: (attribute: Attributes) => void;
  }) => {
  const [value, setValue] = useState<Attributes>(attribute);

  const handleClick = () => {
    handleChangeAttribute(value);
  };
  
  return (
    <div className={`relative w-40 h-40 ${className} hover:scale-[120%] transition-al duration-200`} onClick={handleClick}>
      <Image
        src={`/attributes-ball/${attribute}.png`}
        alt={attribute}
        className="w-full h-full"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default function ModalAttributes({
  showAttributeModal,
  handleCloseModal,
  handleChangeAttribute,
}: {
  showAttributeModal: boolean;
  handleCloseModal: () => void;
  handleChangeAttribute: (attribute: Attributes) => void;
}) {
  return (
    <Modal isOpen={showAttributeModal} onClose={handleCloseModal} backdrop={false}>
      <div className="relative w-180 h-200 flex flex-row flex-wrap justify-around items-center">
        <div className="flex flex-row justify-around items-center w-full h-1/2">
          {Object.values(Attributes).map((attribute, index) => {
            if (index <= 2)
              return (
                <Sphere
                  attribute={attribute}
                  key={index}
                  handleChangeAttribute={handleChangeAttribute}
                  className={index == 1 ? "bottom-20" : "top-20"}
                />
              );
          })}
        </div>
        <div className="flex flex-row justify-around items-center w-full h-1/2">
          {Object.values(Attributes).map((attribute, index) => {
            if (index >= 3)
              return (
                <Sphere
                  attribute={attribute}
                  key={index}
                  handleChangeAttribute={handleChangeAttribute}
                  className={index == 4 ? "top-20" : "bottom-20"}
                />
              );
          })}
        </div>
      </div>
    </Modal>
  );
}
