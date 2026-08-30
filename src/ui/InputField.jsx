const InputField = ({
  label,
  id,
  type,
  register,
  required,
  message,
  step,
  errors,
  classname,
  min,
  value,
  placeholder,
  readOnly,
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor="id"
        className={`${classname ? classname : ""} font-semibold text-slate-800`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        step={step}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`${classname ? classname : ""} rounded-md border bg-transparent px-2 py-2 text-slate-800 outline-none ${errors?.[id]?.message ? "border-red-500" : "border-slate-700"}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: `Minimun ${min} charaters is required` }
            : "",
          pattern:
            type === "email"
              ? {
                  value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com$/,
                  message: "Invalid email",
                }
              : type === "url"
                ? {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/,
                    message: "Please enter a valid url",
                  }
                : null,
        })}
      />
      {errors?.[id]?.message && (
        <p className="mt-0 text-sm font-semibold text-red-600">
          {errors?.[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
