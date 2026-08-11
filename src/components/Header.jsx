import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../javascript/api.json";



const Header = ({ header, darkMode, setDarkMode }) => {
    const questions = api.questions;

    const [sidebarOpen, setSidebarOpen] = useState(false);










    const location = useLocation();
    const isHome = location.pathname === "/";


    const navItems = [
        {
            name: "Home",
            icon: <span className="material-symbols-outlined">
                home
            </span>,
            path: "/",
        },
        {
            name: "Search",
            icon: <span className="material-symbols-outlined">
                search
            </span>,
            path: "/search",
        },
        {
            name: "Edit",
            icon: <span className="material-symbols-outlined">
                edit
            </span>,
            path: "/edit",
        },
        {
            name: "Add New",
            icon: <span className="material-symbols-outlined">
                add_circle
            </span>,
            path: "/add-new",
        },
        {
            name: "Quiz",
            icon: <span className="material-symbols-outlined">
                cards_stack
            </span>,
            path: "/quiz",
        },

        {
            name: "Favorites",
            icon: <span className="material-symbols-outlined">
                favorite
            </span>,
            path: "/favorites",
        },

        {
            name: "Resumee",
            icon: <span className="material-symbols-outlined">
                contact_page
            </span>,
            path: "/resumee",
        },
    ];

    return (
        <>
            {/* Sidebar */}

            <aside
                className={`
                    scoll-content
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
                        className="flex w-full  items-center border rounded-lg p-3  text-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        
                        {darkMode ? (
                            <>
                                <span className="material-symbols-outlined  pr-3">
                                    wb_sunny
                                </span>
                                Switch Theme
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined pr-3">
                                    moon_stars
                                </span>
                                Switch Theme
                            </>
                        )}
                       

                    </div>

                </div>
            </aside>

            {/* Top Header */}

            <section className="bg-gray-100 dark:bg-gray-700  lg:ml-64 lg:hidden">

                <header className="flex items-center px-4 py-3  ">

                    {/* Left */}

                    <div className="flex w-12 justify-start lg:hidden">
                        <button
                            className="text-2xl dark:text-white text-black"
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

                        {isHome && (
                            <button
                                id="toggleDeleteAlert_btn"
                                /*  className={buttonClasses} */
                                onClick={() => document.getElementById("modal-box").showModal()}

                                className="md:hidden"
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>)}
                    </div>





                </header>




            </section>
        </>
    );
};

export default Header;