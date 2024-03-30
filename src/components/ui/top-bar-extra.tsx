import LoginCheck from "./login-check";

export default function TopBarExtra() {
    return (
        <div className="flex flex-col md:flex-row gap-10">
            <LoginCheck />
        </div>
    )
}