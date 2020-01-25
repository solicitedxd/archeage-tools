export const sortBy = (field, asc = true) => (a, b) => ((a[field] > b[field]) ? 1 : -1) * (asc ? 1 : -1);
