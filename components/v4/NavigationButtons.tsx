'use client';
import Link from 'next/link';
import React from 'react';

interface NavigationButton {
    label: string;
    href: string;
}

interface NavigationButtonsProps {
    prevPage?: NavigationButton;
    nextPage?: NavigationButton;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ prevPage, nextPage }) => {
    return (
        <section className="relative py-16 px-4 bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[400px] h-80 sm:h-[400px] rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto overflow-hidden">
                <div className={`flex flex-col sm:flex-row ${prevPage && nextPage ? 'sm:justify-between' : 'justify-center'} items-center gap-6 sm:gap-8`}>

                    {/* Previous Page Button */}
                    {prevPage && (
                        <Link
                            href={prevPage.href}
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border border-violet-500/30 hover:border-violet-400/50 rounded-2xl text-violet-300 hover:text-violet-200 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/20 backdrop-blur-sm"
                        >
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            <span>{prevPage.label}</span>
                        </Link>
                    )}

                    {/* Navigation Indicator - Only show on larger screens when buttons are side by side */}
                    {prevPage && nextPage && (
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse [animation-delay:0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-violet-400/60 rounded-full animate-pulse [animation-delay:0.6s]"></div>
                        </div>
                    )}

                    {/* Next Page Button */}
                    {nextPage && (
                        <Link
                            href={nextPage.href}
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                        >
                            <span>{nextPage.label}</span>
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NavigationButtons;