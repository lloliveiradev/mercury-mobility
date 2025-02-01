import Logo from "./Logo";

function Header() {
    return (
        <header className="header fixed top-0 lg:z-40 z-20 bg-white w-full font-sans-alt shadow-lg" data-controller="header">
            <div className="fixed top-0 z-50 flex w-full pointer-events-none h-72">
                <div className="header-border absolute right-0 w-half h-full"></div>
            </div>
            <div className="flex max-w-1440 mx-auto">
                <div className="header-logo flex-shrink-0 w-376 py-24 px-40 lg:block hidden" data-header-logo="">
                    <a className="block h-24 max-w-200 -mt-8 mb-8 flex items-center" href="/doc/">
                        <Logo className={'size-50'} style={{ marginTop: '10px' }} />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;