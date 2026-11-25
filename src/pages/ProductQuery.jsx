
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product";
import LoadingPage from "./LoadingPage";

export default function ProductQuery() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts({ limit: 12, skip: 0 }),
  });

  return (
    <div className="p-4 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {isLoading && (
        <LoadingPage title="Loading Products">
          Please wait while we fetch the data.
        </LoadingPage>
      )}

      {isError && <p>Error: {error.message}</p>}

      {data && (
        <section className="w-full max-w-6xl justify-center items-center">
          <nav className="text-2xl font-bold items-center">
            <Link to="/" className="hover:text-green-500">
              Products
            </Link>
            <span className="mx-2">|</span>
            <Link to="/categories" className="hover:text-green-500">
              Categories
            </Link>
          </nav>

          <ul className="grid grid-cols-4 gap-4 mt-4 h-full w-full">
            {data.products.map((product) => (
              <li
                className="bg-gray-100 p-4 rounded-md shadow-md"
                key={product.id}
              >
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />

                <Link
                  to={`/products/${product.id}`}
                  className="text-lg font-bold hover:text-green-500"
                >
                  {product.title}
                </Link>

                <h3 className="text-sm line-clamp-3">
                  {product.description}
                </h3>

                <p>{product.category}</p>

                <div className="flex items-center justify-between mt-2">
                  <p>
                    <span className="text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="text-green-500 font-bold ml-2">
                      ${product.discountPercentage}
                    </span>
                  </p>

                  <span className="text-gray-500">
                    Rating: {product.rating}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
