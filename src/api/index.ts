const urlBase = 'https://dummyjson.com';

export const searchAutocomplete = async (query: string) => {
  const data = await fetch(`${urlBase}/products/search?q=${query}`, {
    method: 'GET',
  });
  const jsonData = await data.json();
  return jsonData.products;
};

export const getIdBySearchResults = async (query: string) => {
  const data = await fetch(`${urlBase}/products/search?q=${query}`, {
    method: 'GET',
  });
  const jsonData = await data.json();
  return jsonData.products[0].id;
}

export const getCategories = async () => {
  const data = await fetch(`${urlBase}/products/categories`)
  const jsonData = await data.json();
  return jsonData
    .map((x: string) => x.replace('-', ' '))
    .map((x: string) => x.split(' ')
      .map((y: string) => y[0].toUpperCase() + y.substring(1))
      .join(' ')
    )
    .map((x: string) => ({title: x, selected: false}))
}

export const getProducts = async (page:number = 0, category:string = '') => {
  if (category === 'All') {
    const data = await fetch(`${urlBase}/products?limit=12&skip=${(page - 1) * 12}`);
    const jsonData = await data.json();
    return jsonData;
  } else {
    const data = await fetch(`${urlBase}/products/category/${category.replace(' ', '-').toLowerCase()}?limit=12&skip=${(page - 1) * 12}`);
    const jsonData = await data.json();
    return jsonData;
  }
}

export const getProductById = async (id: number) => {
  const data = await fetch(`${urlBase}/products/${id}`);
  const jsonData = await data.json();
  return jsonData;
}
