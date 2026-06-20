const btnStyles =
  "flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 bg-white font-semibold hover:bg-slate-100";

const SetQuantity = ({
  quantity,
  cardCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {!cardCounter && <div className="text-sm font-semibold">QUANTITY</div>}

      <button
        disabled={quantity <= 1}
        className={btnStyles}
        onClick={handleQtyDecrease}
      >
        -
      </button>

      <div className="min-w-[30px] text-center font-semibold text-slate-700">
        {quantity}
      </div>

      <button className={btnStyles} onClick={handleQtyIncrease}>
        +
      </button>
    </div>
  );
};

export default SetQuantity;
