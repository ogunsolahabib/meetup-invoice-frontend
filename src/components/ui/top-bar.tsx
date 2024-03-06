import CustomHeader from "./custom-header";

export default function TopBar() {
    return (
        <div className="flex h-16 items-center justify-between sticky top-0">
            <CustomHeader />
        </div>
    )
}