import { SyntheticEvent, useState } from 'react';
import Datalist from '../Datalist';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const [products, setProducts] = useState<any[]>([]);
  const searchHandler = async (e: SyntheticEvent) => {
    try {
      const target = e.target as HTMLInputElement;
      const response = await fetch(
        //@ts-ignore
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/names/${e.target.value}`,
      );
      const {
        data: { products },
      } = await response.json();
      console.log(products);
      setProducts(products);
    } catch (error) {}
  };
  return (
    <>
      <form className="mb-6 flex justify-center align-center ">
        <p
          className={`${
            focused ? 'text-red-400' : 'text-gray-400 '
          } absolute top-7 left-7 py-2 px-4`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </p>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={searchHandler}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-10 text-slate-700  focus:outline-none focus:bg-white focus:border-red-400 "
          type="search"
          name="search"
          placeholder="Search Product Here"
        />
      </form>
      {products ? (
        <Datalist
          products={products}
          resetSearch={() => {
            setProducts([]);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};
export default SearchBar;
