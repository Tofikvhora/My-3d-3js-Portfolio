import React, { useState } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { logo, menu, close } from "../assets";
import { navLinks } from "../Const";

const Navbar = () => {
  const [active, setactive] = useState("");
  const [toggle, setToggle] = useState("");
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl max-auto">
        <Link
          to="/"
          className="flex item-center gap-2"
          onClick={() => {
            setactive("");
            window.screenTop(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain"></img>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Tofik &nbsp; <span className="sm:block hidden"> | Flutter Master</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
               onClick={() => setactive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end item-center">
          <img
            src={toggle ? close : menu}
            alt="manu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          ></img>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 round-xl`}
          >
            <ul className="list-none flex justify-end item-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  }font-poppins font-medium coursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle)
                    setactive(link.title)
                  }
                  }
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
