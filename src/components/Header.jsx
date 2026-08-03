import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../javascript/api.json";

const Header = ({ header, darkMode, setDarkMode }) => {
    const questions = api.questions;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        {
            name: "Home",
            icon: "🏠",
            path: "/",
        },
        {
            name: "Search",
            icon: "🔍",
            path: "/search",
        },
        {
            name: "Edit",
            icon: "✏️",
            path: "/edit",
        },
        {
            name: "Add New",
            icon: "➕",
            path: "/add-new",
        },
        {
            name: "Quiz",
            icon: "📝",
            path: "/quiz",
        },

        {
            name: "Favorites",
            icon: "⭐",
            path: "/favorites",
        },
    ];

    return (
        <>
            {/* Sidebar */}

            <aside
                className={`
        fixed
        top-0
        left-0
        h-screen
        w-64
        bg-gray-100
        text-gray-900
        dark:bg-gray-800
        dark:text-white
        shadow-xl
        transition-transform
        duration-300
        z-50

        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

        lg:translate-x-0
    `}
            >
                <div className="flex items-center justify-between border-b border-gray-300 p-4 dark:border-gray-700">

                    <h1 className="text-xl font-bold">
                        STAR Candidate
                    </h1>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 xl:hidden"
                    >
                        ✕
                    </button>

                </div>

                <div className="space-y-2 p-4">

                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-lg p-3 text-gray-800 transition-colors hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                        >
                            <span>{item.icon}</span>

                            {item.name}
                        </Link>
                    ))}

                    <div
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex w-full items-center border rounded-lg p-3 text-2xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {darkMode ? "🌞 Switch Theme" : "🌙 Switch Theme"}
                    </div>

                </div>
            </aside>

            {/* Top Header */}

            <section className="bg-gray-100 dark:bg-gray-700  lg:ml-64 lg:hidden">

                <section className="flex items-center px-4 py-3  ">

                    {/* Left */}

                    <div className="flex w-12 justify-start lg:hidden">
                        <button
                            className="text-2xl dark:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                    </div>

                    {/* Title */}

                    <h1 className="flex-1 text-center text-2xl font-bold text-gray-900 dark:text-white">
                        {header}
                    </h1>

                    {/* Right */}

                    <div className="flex w-12 justify-end lg:hidden">
                        <button className="dark:text-white  ">
                            <span className="material-symbols-outlined">
                                tune
                            </span>
                        </button>
                    </div>

                </section>

            </section>
        </>
    );
};

export default Header;