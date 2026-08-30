export function buildProductQuery(searchParams) {
  const params = new URLSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  params.set("pageNumber", currentPage);

  const sortOrder = searchParams.get("sortDir") || "asc";
  const categoryParams = searchParams.get("category") || null;
  const keyword = searchParams.get("keyword") || null;
  params.set("sortBy", "price");
  params.set("sortDir", sortOrder);

  if (categoryParams) {
    params.set("category", categoryParams);
  }
  if (keyword) {
    params.set("keyword", keyword);
  }

  return params.toString();
}
