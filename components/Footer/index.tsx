import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="m-h-32 w-full bg-neutral-700  p-2 lg:p-10 grid lg:grid-flow-col justify-start gap-10">
      <p className="text-2xl text-red-400">SanityWatch</p>
      <div>
        <div>
          <h3 className="text-neutral-50 ml-6 font-bold text-2xl">Contacts</h3>
          <p className=" text-neutral-400 px-5 mb-3">
            Address:New York NY 998 Bell Street 10005
          </p>

          <p className=" text-neutral-400 px-5 mb-3">
            Phone Number:New York NY 998 Bell Street 10005
          </p>

          <p className=" text-neutral-400 px-5 mb-3">
            Address:New York NY 998 Bell Street 10005
          </p>

          <div className="px-5 grid justify-items-start  grid-flow-col w-52">
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faTwitter}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faFacebook}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faYoutube}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faInstagram}
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-neutral-50 ml-6 font-bold text-2xl">
          Subscribe To Our Newsletter
        </h3>
        <form className="ml-5 m-3">
          <input
            className="border rounded-full h-12 w-80 px-5 "
            placeholder="Email Address"
          ></input>
          <button className="bg-red-500 h-9 rounded-full absolute -translate-x-24 translate-y-1   p-2 text-neutral-50">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
