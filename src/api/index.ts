const urlBase = 'https://dummyjson.com';

export const searchAutocomplete = async (query: string) => {
  const data = await fetch(`${urlBase}/products/search?q=${query}`, {
    method: 'GET',
  });
  const jsonData = await data.json();
  return jsonData.products;
};

export const getCategories = async () => {
  const data = await fetch(`${urlBase}/products/categories`)
  const jsonData = await data.json();
  return jsonData
    .map(x => x.replace('-', ' '))
    .map(x => x.split(' ')
      .map(y => y[0].toUpperCase() + y.substring(1))
      .join(' ')
    );
}
