import React from "react";

const FormProduct = ({ type, label, id, value, onChange }) => {
    return (
        <div className="mb-6">
            <label htmlFor={id}>{label} <b className="text-red-500">*</b></label>
            <input type={type} 
                className="mt-1 w-full border-[1px] border-gray-300 p-3 rounded-lg outline-sky-900"
                placeholder={label}
                id={id}
                name={id}
                value={value}
                onChange={onChange} />
        </div>
    )
};

export default FormProduct;