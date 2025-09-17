const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
            <div className="max-w-6xl mx-auto border-b border-white/10">
                <div className="px-6 py-6 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                            <span className="text-black font-bold text-sm">SS</span>
                        </div>
                        <span className="text-white font-semibold text-lg">Shivam Sahil</span>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#intro" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                            Intro
                        </a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                            About
                        </a>
                        <a href="#work" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                            Work
                        </a>
                        <a href="#thoughts" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                            Thoughts
                        </a>
                        <a href="#connect" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                            Connect
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <input type="checkbox" id="mobileMenu" className="sr-only peer" />
                        <label htmlFor="mobileMenu" className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer">
                            <span className="block w-5 h-0.5 bg-white transition-all duration-200 peer-checked:rotate-45 peer-checked:translate-y-1"></span>
                            <span className="block w-5 h-0.5 bg-white mt-1 transition-all duration-200 peer-checked:opacity-0"></span>
                            <span className="block w-5 h-0.5 bg-white mt-1 transition-all duration-200 peer-checked:-rotate-45 peer-checked:-translate-y-1"></span>
                        </label>

                        {/* Mobile menu dropdown */}
                        <div className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-all duration-200">
                            <nav className="max-w-6xl mx-auto px-6 py-6 space-y-4">
                                <a href="#intro" className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                                    Intro
                                </a>
                                <a href="#about" className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                                    About
                                </a>
                                <a href="#work" className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                                    Work
                                </a>
                                <a href="#thoughts" className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                                    Thoughts
                                </a>
                                <a href="#connect" className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                                    Connect
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;