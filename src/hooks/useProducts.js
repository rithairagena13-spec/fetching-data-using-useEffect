import { useEffect, useState } from "react"
import { fetchProducts } from "../api/product"
import axios from "axios"

export function useProducts({ limit, skip }) {
  const [state, setState] = useState({ status: "loading", data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts({ limit, skip, signal: controller.signal })
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((error) => {
        if (axios.isCancel(error)) return
        setState((s) => ({ ...s, status: "error", error }))
      })
    return () => controller.abort()
  }, [limit, skip])

  return state
}
