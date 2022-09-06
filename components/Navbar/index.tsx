import { FC, useRef, useState } from 'react';
import Notification from '../Notification';
import Link from 'next/link';
import NavLink from '../NavLink';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../slices/AuthSlice';
// import Basket from '../Basket';
import SearchBar from '../SearchBar';
import dynamic from 'next/dynamic';
const Basket = dynamic(() => import('../Basket'), { ssr: false });

const Navbar: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveCategories, setIsActiveCategories] = useState<boolean>(false);

  const dispatch = useDispatch();
  const basket = useSelector((state: any) => state.basket);
  const notificationState = useSelector((state: any) => state.notification);

  const setMobileNavState = () => {
    setIsActive(prev => !prev);
  };
  const setActiveCategories = () => {
    setIsActiveCategories(prev => !prev);
  };
  return (
    <>
      {notificationState?.isActive ? (
        <Notification
          content={notificationState.content}
          type={notificationState.type}
        />
      ) : (
        ''
      )}
      <nav className=" mx-auto p-7 w-screen border-b-4 bg-slate-700 border-neutral-400 flex flex-col justify-center ">
        <div className="flex items-center justify-between ">
          <p className="text-2xl text-red-400">SanityWatch</p>

          <ul className=" md:flex  hidden space-x-6">
            <NavLink href="/" text="Home" />

            <NavLink href="/products" text="Products" />
            <Link href="/basket">
              <a className="text-neutral-50">
                <Basket products={basket} />
              </a>
            </Link>
          </ul>
          <button
            onClick={setMobileNavState}
            className="text-red-700 text-lg hover:text-neutral-400 lg:hidden block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </button>
        </div>
      </nav>

      <nav
        className={`bg-slate-700  px-2  z-10 absolute w-full ${
          isActive ? 'flex animate-fade' : 'hidden'
        }`}
      >
        <ul className=" flex flex-col md:hidden  ">
          <NavLink fn={setMobileNavState} href="/" text="Home" isMobile />
          <NavLink
            fn={setMobileNavState}
            href="/products"
            text="Products"
            isMobile
          />
          <Link href="/basket">
            <a className="ml-5 mt-4 mb-3 text-neutral-50">
              <Basket products={basket} />
            </a>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
