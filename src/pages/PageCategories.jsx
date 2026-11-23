import { useState } from "react";
import { useFetchCategories } from "../hooks/userFetchCategories";
import LoadingPage from "./LoadingPage";

export default function PageCategories() {
    const [query, setQuery] = useState("");
    const { status, data, error } = useFetchCategories();
    const normalizedQuery = query.trim().toLowerCase();
    const filteredCategories = Array.isArray(data)
        ? data.filter((category) =>
            category.toLowerCase().includes(normalizedQuery)
        )
        : [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <input
                type="search"
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
                placeholder="Search categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {status === "idle" && <p>Search for categories...</p>}
            {status === "loading" && <LoadingPage title="Loading categories..." />}
            {status === "error" && <p>Error: {error?.message}</p>}
            {status === "success" && (
                <ul className="grid grid-cols-4 gap-4 mt-4">
                    {filteredCategories.map((category) => (
                        <li key={category} className="bg-gray-100 p-4 rounded-md shadow-md">
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}