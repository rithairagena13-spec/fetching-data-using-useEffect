import { useEffect, useState } from "react";
import { fetchCategories } from "../api/product";
import axios from "axios";

export function useFetchCategories() {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    fetchCategories({ signal: controller.signal })
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setState((s) => ({ ...s, status: "error", error }));
      });
    return () => controller.abort();
  }, []);

  return state;
}
