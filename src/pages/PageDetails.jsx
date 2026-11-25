
import { useParams } from "react-router-dom";
import ProductQueryId from "./ProductQueryId";

export default function PageDetails() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <ProductQueryId id={id} />

      <button
        onClick={() => window.history.back()}
        className="bg-green-500 font-bold text-white px-4 py-2 rounded mt-4 hover:bg-green-600 cursor-pointer"
      >
        Return to Products
      </button>
    </div>
  );
}
