import CustomHeader from "./custom-header";
import LoginCheck from "./login-check";
import { QuickMenuDropdown } from "./quick-menu-dropdown";
import TopBarExtra from "./top-bar-extra";

export default function TopBar() {
    return (

        <div className="flex justify-between w-full">
            <span className="text-xl md:text-2xl font-extrabold text-gray-500">Tech Meetup</span>
            <div className="hidden md:block">
                <TopBarExtra />
            </div>
        </div>

    )
}