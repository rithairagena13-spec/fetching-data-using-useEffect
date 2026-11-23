import { useEffect, useState } from "react"
import { fetchProduct } from "../api/product"
import axios from "axios"

export const useProductsById = (ids) => {
    const [state, setState] = useState({ status: "loading", data: null, error: null })

    useEffect(() => {
        const controller = new AbortController()
        Promise.all(ids.map((id) => fetchProduct(id, { signal: controller.signal })))
            .then((data) => setState({ status: "success", data, error: null }))
            .catch((error) => {
                if (axios.isCancel(error)) return
                setState((s) => ({ ...s, status: "error", error }))
            })
        return () => controller.abort()
    }, [ids])

    return state
}