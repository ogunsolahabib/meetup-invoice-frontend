import LoginCheck from "./login-check";
import { QuickMenuDropdown } from "./quick-menu-dropdown";

export default function TopBarExtra() {
    return (
        <div className="flex flex-col md:flex-row gap-10">
            <LoginCheck />
            <QuickMenuDropdown />
        </div>
    )
}