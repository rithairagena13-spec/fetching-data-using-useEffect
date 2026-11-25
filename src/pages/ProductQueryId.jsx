
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/product";
import LoadingPage from "./LoadingPage";

export default function ProductQueryId({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchProduct(id, { signal }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <LoadingPage title="Loading Product">
        Please wait while we fetch the product.
      </LoadingPage>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className="max-w-4xl mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center">{data.title}</h1>

      {data.images?.length > 0 && (
        <img
          src={data.images[0]}
          alt={data.title}
          className="w-full object-cover rounded-md mt-4"
        />
      )}

      <p className="text-center text-gray-500 mt-4">
        {data.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold">{data.category}</p>
        <p className="font-semibold">
          Price: ${data.price}
        </p>
      </div>

      <p className="text-gray-500 mt-2">
        Rating: {data.rating}
      </p>
    </section>
  );
}
