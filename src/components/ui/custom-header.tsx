import { Button } from "./button";
import LoginCheck from "./login-check";
import { QuickMenuDropdown } from "./quick-menu-dropdown";
import TopBar from "./top-bar";

export default function CustomHeader() {
    return (
        <div className="flex h-16 items-center justify-between sticky top-0">
            <TopBar />
        </div>
    );
}
