import CustomHeader from "./custom-header";

export default function SidebarContent() {
    return (
        <div>
            <CustomHeader />
            <div className="mt-6">
                {["Invoices", "Sponsors"].map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className="block rounded px-4 py-2.5 transition duration-200 hover:text-white hover:bg-gray-900">
                        {item}
                    </a>
                ))}
            </div>
        </div>
    )
}