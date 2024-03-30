import { Button } from "./button";
import LoginCheck from "./login-check";
import { QuickMenuDropdown } from "./quick-menu-dropdown";
import TopBar from "./top-bar";

export default function CustomHeader() {
    return (

        <header className="sticky inset-0 top-0 md:border-b">
            <div className="container flex h-16 items-center justify-between "><TopBar /></div>
        </header>
    );
}
