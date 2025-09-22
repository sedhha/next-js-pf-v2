'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    currentPage: number;
    totalPages: number;
    categorySlug: string;
    from: number;
    to: number;
}

export default function BlogPagination({ currentPage, totalPages, categorySlug, from, to }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const itemsPerPage = to - from;

    const handlePageChange = (page: number) => {
        const newFrom = (page - 1) * itemsPerPage;
        const newTo = newFrom + itemsPerPage;

        const params = new URLSearchParams(searchParams || '');
        params.set('from', newFrom.toString());
        params.set('to', newTo.toString());

        router.push(`/portfolio-blogs/${categorySlug}?${params.toString()}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
          ${currentPage === 1
                        ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                        : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-black/60'
                    }
        `}
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`
                w-10 h-10 rounded-full font-medium transition-all duration-300
                ${isActive
                                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg'
                                    : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-black/60'
                                }
              `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`
          flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
          ${currentPage === totalPages
                        ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                        : 'bg-black/40 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white hover:bg-black/60'
                    }
        `}
            >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Page Info */}
            <div className="ml-4 text-sm text-gray-500">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
}