import {Link} from "react-router-dom";

import Logo from "@/assets/logo.svg";
import Bell from "@/assets/bell.svg";
import Burger from "@/assets/burger.svg";

export function AppHeader() {
  return (
    <header className="container mx-auto py-4 bg-white flex items-center justify-between px-6 shadow-lg max-[360px]:justify-center">
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="max-[360px]:h-[26px]" />
      </Link>

      <div className="flex items-center gap-6 max-[360px]:hidden">
        <img src={Bell} alt="notifications" />
        <img src={Burger} alt="menu" />
      </div>
    </header>
  );
}
