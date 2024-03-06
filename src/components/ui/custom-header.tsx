import LoginCheck from "./login-check";

export default function CustomHeader() {
    return (
        <div className="flex justify-between w-full">
            <span className="text-xl font-extrabold">Tech Meetup</span>
            <LoginCheck />
        </div>
    );
}
