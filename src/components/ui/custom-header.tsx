import { Button } from "./button";
import LoginCheck from "./login-check";
import { QuickMenuDropdown } from "./quick-menu-dropdown";

export default function CustomHeader() {
    return (
        <div className="flex justify-between w-full">
            <span className="text-xl font-extrabold">Tech Meetup</span>
            <div className="flex gap-3">
                <LoginCheck />
                <QuickMenuDropdown />
            </div>
        </div>
    );
}
