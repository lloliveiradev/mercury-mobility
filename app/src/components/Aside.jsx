function Aside() {
    return (
        <aside className="fixed top-0 flex-shrink-0 bg-x-gradient-grey-200-grey-400-80 leading-tight lg:w-376 lg:flex lg:flex-col z-30 h-screen w-full hidden text-lg" data-target="app.sidebar">
            <div className="lg:block h-72 flex-grow-0 flex-shrink-0 hidden"></div>
            <div className="flex-grow w-inherit overflow-y-auto h-full" data-controller="sidebar">
                <div className="h-full" style={{ "backgroundColor": "#333333" }}>
                    <div className="px-40 pt-48 pb-24">
                        <button className="block mb-32 text-xs font-semibold leading-none uppercase tracking-wide text-grey-700-opacity-60 focus:outline-none">
                            <span data-action="click->sidebar#toggleSubCategories" data-target="sidebar.expand" className="text-white">
                                Expand all
                            </span>
                            <span className="hidden text-white" data-action="click->sidebar#toggleSubCategories" data-target="sidebar.collapse">
                                Collapse all
                            </span>
                        </button>
                        <ul>
                            <li className="mt-24">
                                <a className="flex items-center hover:text-sky-600 text-sky-600" data-active="true" data-target="sidebar.link" href="/doc/">
                                    <span className="flex items-center text-sky-600">
                                        <span className="flex w-16 h-16 mr-24 items-center justify-center fill-current">
                                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 17"><path d="M14.81,5.71l-7-5.6a.48.48,0,0,0-.62,0l-7,5.6A.49.49,0,0,0,0,6.1v8.8A2.08,2.08,0,0,0,2.06,17H12.94A2.08,2.08,0,0,0,15,14.9V6.1A.49.49,0,0,0,14.81,5.71ZM9.33,16H5.67V9H9.33ZM14,14.9A1.08,1.08,0,0,1,12.94,16H10.33V8.5a.5.5,0,0,0-.5-.5H5.17a.5.5,0,0,0-.5.5V16H2.06A1.08,1.08,0,0,1,1,14.9V6.34l6.5-5.2L14,6.34Z"></path></svg>
                                        </span>
                                        Home
                                    </span>

                                </a>
                            </li>
                            <li className="mt-24" data-action="click->sidebar-item#toggle" data-controller="sidebar-item">
                                <span className="mb-16 flex items-center cursor-pointer text-white">
                                    <span className="flex items-center text-white">
                                        <span className="flex w-16 h-16 mr-24 items-center justify-center fill-current">
                                            <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.2 18.2"><path d="M8.88,7.93,5.61,6.79,6.45.54A.47.47,0,0,0,6.13,0a.46.46,0,0,0-.57.21L.06,9.58l0,.08a.48.48,0,0,0,.29.61l3.27,1.14-.84,6.25a.47.47,0,0,0,.32.51.41.41,0,0,0,.16,0A.47.47,0,0,0,3.64,18L9.13,8.62a.59.59,0,0,0,0-.08A.48.48,0,0,0,8.88,7.93Zm-4.33,3.2a.49.49,0,0,0-.32-.51L1.13,9.54l4.19-7L4.65,7.07A.49.49,0,0,0,5,7.58l3.1,1.08-4.19,7Z"></path></svg>
                                        </span>
                                        Urban Mobility
                                    </span>
                                </span>
                                <ul className="mt-8 ml-40 hidden" data-action="click->sidebar-item#stop" data-target="sidebar.submenu sidebar-item.submenu">
                                    <li className="mt-8 leading-normal">
                                        <span className="flex justify-between items-center">
                                            <a className="hover:text-sky-600 text-grey-200" data-active="false" data-target="sidebar.link" href="/doc/guides/getting-started/what-is-algolia/">
                                                Home x Work Displacement
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="px-40">
                <div className="flex flex-wrap items-center lg:justify-between -mx-16 py-16 border-grey-400-opacity-60 border-solid border-t">
                    <a className="block mx-16 py-8 text-sm text-grey-700 hover:text-grey-800 transition-fast-out" href="https://www.algolia.com/" target="_blank">
                        mercury-mobility.com
                    </a>
                </div>
            </div>
            <button className="flex lg:hidden absolute items-center top-0 right-0 mt-48 mr-40 text-grey-700-opacity-90 hover:text-grey-700 fill-current transition-fast-out focus:outline-none focus:shadow-outline" data-action="click->app#toggleSidebar">
                <span className="flex items-center h-16 w-16 mr-16 flex-grow-0 flex-shrink-0">
                    <svg className="block h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M8.41,7l5.3-5.29A1,1,0,1,0,12.29.29L7,5.59,1.71.29A1,1,0,0,0,.29,1.71L5.59,7,.29,12.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L7,8.41l5.29,5.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
                    </svg>
                </span>
                <span className="block flex-grow-0 flex-shrink-0 mt-2 font-sans-alt text-base leading-none">
                    Close
                </span>
            </button>
        </aside>
    )
}

export default Aside