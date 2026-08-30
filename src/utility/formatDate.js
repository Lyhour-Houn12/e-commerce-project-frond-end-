export const formatDate = (date, options = {}) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "";

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return parsedDate.toLocaleString("en-US", { ...defaultOptions, ...options });
};
