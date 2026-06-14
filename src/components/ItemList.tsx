import type { Item } from "../type";
import ItemCard from "./ItemCard";
interface ItemListProps {
  items: Item[];
  onDeleteItem: (id: number) => void;
  onEditItem:(item:Item)=>void;
}
function ItemList(props: ItemListProps) {
  return (
    <div className="showArea">
      {props.items.length === 0 ? (
        <p>no found orz</p>
      ) : (
        props.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={() => props.onDeleteItem(item.id)}
            onEdit={()=>props.onEditItem(item)}
          />
        ))
      )}
    </div>
  );
}
export default ItemList;
