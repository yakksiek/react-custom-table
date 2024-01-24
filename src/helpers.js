export function generatePaginationData(currentPage, limit, length) {
    console.log('currentPage:' + currentPage);
    const pages = Math.ceil(length / limit);

    const begin = limit * (currentPage - 1);
    const end = currentPage * limit;

    // const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    // const nextPage = currentPage < pages ? currentPage + 1 : pages;

    const generatePageNumbers = () => {
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= pages; i++) {
            if (i === 1 || i === pages || i === currentPage || (i >= currentPage - 1 && i <= currentPage + 1)) {
                range.push(i);
            }
        }

        let l = null;
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...'); //
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= pages;

    return {
        // prevPage,
        // nextPage,
        pageNumbers: generatePageNumbers(),
        isPrevDisabled,
        isNextDisabled,
        pages,
        begin,
        end,
    };
}
