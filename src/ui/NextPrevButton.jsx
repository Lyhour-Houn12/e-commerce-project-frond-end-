const NextPrevButton = ({
  handleNext,
  disabledNext,
  disabledPrev,
  handlePrev,
}) => {
  return (
    <div className="fixed right-35 bottom-5 z-50 items-center justify-center bg-slate-50 py-4 shadow-[-2_-2px_10px_rgba(0,0,0,0.1)]">
      <div class="flex flex-row items-center">
        <button
          type="button"
          onClick={handlePrev}
          disabled={disabledPrev}
          className={`rounded-l-md border-r ${disabledPrev ? "cursor-not-allowed opacity-40" : ""} border-gray-100 bg-gray-800 px-3 py-2 text-white hover:bg-red-700 hover:text-white`}
        >
          <div class="flex flex-row align-middle">
            <svg
              class="mr-2 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p class="ml-2">Prev</p>
          </div>
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={disabledNext}
          class="rounded-r-md border-l border-gray-200 bg-gray-800 px-3 py-2 text-white hover:bg-red-700 hover:text-white"
        >
          <div class="flex flex-row align-middle">
            <span class="mr-2">Next</span>
            <svg
              class="ml-2 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NextPrevButton;
