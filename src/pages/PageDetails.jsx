import { useParams } from "react-router-dom";
import { useProductsById } from "../hooks/useProductsById";
import LoadingPage from "./LoadingPage";

export default function PageDetails() {
  const { id } = useParams();
  const { status, data, error } = useProductsById([id]);
  const product = data?.[0];

  return (
    <div className="p-4">
      {status === "loading" && (
        <LoadingPage>Please wait while we fetch the data.</LoadingPage>
      )}
      {status === "error" && <p>Error: {error?.message}</p>}
      {status === "success" && product && (
        <section className="max-w-4xl mx-auto min-h-screen">
          <div className="p-4 flex flex-col gap-2">
            <h1 className="flex justify-center text-2xl font-bold">{product.title}</h1>
            {product.images && product.images.length > 0 && (
              <div className="flex justify-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <p className="text-bold text-center text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
                <p className="font-semibold border-2 border-gray-50 p-2 rounded-md">{product.category}</p>
            <p className="text-lg font-semibold">
              <span>Price: ${product.price}</span>
              <span className="text-green-500 font-bold ml-2">
                {product.discountPercentage}% off
              </span>
            </p>
            </div>
            <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500">Rating: {product.rating}</p>
            <p className="text-gray-500">{product.stock} in stock</p>
            {product.tags && (
              <div className="mt-2 flex gap-4">
                <h3 className="font-semibold">Tags:</h3>
                <ul className="flex gap-5 ">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="bg-gray-200 px-2 py-1 rounded">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            </div>
            <button to="/" onClick={() => window.history.back()} className="bg-green-500 font-bold text-white px-4 py-2 rounded mt-4 hover:bg-green-600 cursor-pointer">
                Return to Products
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
