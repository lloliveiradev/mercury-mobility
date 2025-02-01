import Logo from "./Logo";

function Nav() {
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl max-h-10 items-center justify-between py-2 px-4 lg:px-8 shadow-lg" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Logo className={'size-30'} />
                </div>
            </nav>
        </header>

    );
};

export default Nav;