"use client";

import { useEffect } from "react";
import axios from "axios";
import { api } from "../../config/config";

export default function ProductsPage() {
  useEffect(() => {
    console.log("🧩 useEffect triggered");

    const apiUrl =api;
    console.log("🔗 API URL:", apiUrl);

    axios
      .get(`${apiUrl}/products`)
      .then((res) => {
        console.log("✅ Products fetched successfully:");
        console.log(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err.message);
      });
  }, []);

  return null;
}
