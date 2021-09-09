import React from "react";
import { Button, Input, Spinner, useDisclosure } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import { usePlatot } from "hooks/usePlatot";
import { DocumentItem } from "../../context/document";
import { Plata } from "types/Plata";
import { getCatalogLength, getCatalogPriceSum } from "./PlataCatalog.services";
import {
  DiscountDialog,
  DeliveryDialog,
  PlataDialog,
} from "./PlataCatalogDialogs";

export default function PlataCatalog({
  catalog,
  onChange,
}: {
  catalog: DocumentItem[];
  onChange: (item: DocumentItem[]) => void;
}) {
  const { data: platot, isLoading } = usePlatot();

  const onClickPlata = (plata: Plata) => {
    const isPlataExist = catalog.find((o) => o.name === plata.name);
    const newItem = {
      name: plata.name,
      price: plata.price,
      quantity: isPlataExist ? isPlataExist.quantity + 1 : 1,
    };
    onChange(
      isPlataExist
        ? catalog.map((c) => (c.name === isPlataExist.name ? newItem : c))
        : [...catalog, newItem],
    );
  };

  const changeQuantity = (value: string, name: string) => {
    onChange(
      catalog.map((o) =>
        o.name === name ? Object.assign({}, o, { quantity: Number(value) }) : o,
      ),
    );
  };

  const onRemovePlata = (name: string) => {
    onChange(catalog.filter((o) => o.name !== name));
  };

  const addDiscount = (discount: number) => {
    const isDiscountExist = catalog.find((o) => o.name === "הנחה");
    if (isDiscountExist) {
      return onChange(
        catalog.map((o) => (o.name === "הנחה" ? { ...o, discount } : o)),
      );
    }
    onChange(catalog.concat({ name: "הנחה", discount, quantity: 1 }));
  };

  const handleDialogSubmit = (values: any) => {
    if (values.discount) {
      addDiscount(Number(values.discount));
      return;
    }
    onClickPlata(values);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="catalog">
      <div className="platot">
        {platot.map((plata: Plata) =>
          plata.child.length > 0 ? (
            <PlataWithChildren
              key={plata.name}
              plata={plata}
              onClickPlata={onClickPlata}
            />
          ) : (
            <div
              className="plata"
              onClick={() => onClickPlata(plata)}
              key={plata.name}
            >
              {plata.name}
            </div>
          ),
        )}

        <DiscountDialog onSubmit={handleDialogSubmit} />
        <DeliveryDialog onSubmit={handleDialogSubmit} />
        <PlataDialog onSubmit={handleDialogSubmit} />

        <div className="plata" onClick={() => addDiscount(10)}>
          הנחה 10%
        </div>
      </div>
      <div className="summary">
        <div className="summary-table-head">פריט</div>
        <div className="summary-table-head">מחיר</div>
        <div className="summary-table-head">כמות</div>
        <div className="summary-table-head">סה"כ</div>
        <div className="summary-table-head"></div>
        <CatalogDetails
          catalog={catalog}
          onRemovePlata={onRemovePlata}
          changeQuantity={changeQuantity}
        />
      </div>
      <div className="summary-details">
        <div className="summary-row">
          פריטים:
          <span>{getCatalogLength(catalog)}</span>
        </div>
        <div className="summary-row">
          סה"כ:
          <span>&#8362;{getCatalogPriceSum(catalog)}</span>
        </div>
      </div>
    </div>
  );
}

function PlataWithChildren({ onClickPlata, plata }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isOpen ? (
    <div className="parent-plata">
      {plata.child.map((plata: Plata) => {
        return (
          <div
            className="plata"
            onClick={() => onClickPlata(plata)}
            key={plata.name}
          >
            {plata.name}
          </div>
        );
      })}
      <div onClick={onClose}>
        <Button>חזור</Button>
      </div>
    </div>
  ) : (
    <div className="plata" onClick={onOpen} key={plata.name}>
      {plata.name}
    </div>
  );
}

function CatalogDetails({ catalog, onRemovePlata, changeQuantity }: any) {
  if (catalog.length === 0) return <div className="emptyCell">אין מוצרים</div>;
  return catalog.map((o: any) => {
    if (o.discount) {
      return (
        <React.Fragment key={o.name}>
          <div className="cell">{o.name}</div>
          <div className="cell">{o.discount}%</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell" onClick={() => onRemovePlata(o.name)}>
            <BiTrash />
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={o.name}>
        <div className="cell">{o.name}</div>
        <div className="cell">&#8362;{o.price}</div>
        {
          <div className="cell">
            {o.name !== "הנחה" && (
              <Input
                id="textfield__quantity"
                className="textfield"
                value={o.quantity}
                onChange={(e) => changeQuantity(e.target.value, o.name)}
                type="number"
              />
            )}
          </div>
        }
        <div className="cell">&#8362;{o.price * o.quantity}</div>
        <div className="cell" onClick={() => onRemovePlata(o.name)}>
          <BiTrash className="removeCircleIcon" />
        </div>
      </React.Fragment>
    );
  });
}
