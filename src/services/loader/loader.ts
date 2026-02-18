import { getProducts } from "../api/product";

export const productsLoader = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const filters = {
    page: params.get("page") || "1",
    pageSize: params.get("pageSize") || "10",
    minPrice: params.get("minPrice"),
    maxPrice: params.get("maxPrice"),
    onlySales: params.get("onlySales"),
    search: params.get("search"),
    categoryName: params.get("categoryName"),
  };
  

  const productPromise = getProducts(filters);
  return { productsResponse: productPromise };
};
