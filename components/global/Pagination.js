import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Pagination = ({ total, callback }) => {
  const router = useRouter();
  console.log(">>>>>>>....", router.query)
  const [page, setPage] = useState(parseInt(router.query.page) || 1);

  const newArr = [...Array(total)].map((item, idx) => idx + 1);


  const isActive = (index) => {
    if (index === page) return "active";
    return "";
  };

  //1 onclick navigate to page
  const hdlPagination = (num) => {
    router.push(`?page=${num}`);
  };
  //2 on page searchparam change setPage state
  useEffect(() => {

    let newPage = router.query.page;
    if (newPage) {
      setPage(parseInt(newPage));
    }
  }, [router.query]);
  //3 on pageState change callback load new data
  useEffect(() => {

    callback(page);
    //updaste data
  }, [page]);

  return (
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px">
        {page > 1 && (
          <li
            class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => hdlPagination(page - 1)}
          >
            Previous
          </li>
        )}

        {newArr.map((num, index) => {
          return (
            <li key={index}
              onClick={() => hdlPagination(num)}
              className={`${isActive(
                num
              )} px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {num}
            </li>
          );
        })}

        {page < total && (
          <li
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => hdlPagination(page + 1)}
          >
            Next
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
