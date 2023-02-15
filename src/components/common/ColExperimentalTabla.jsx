import React from 'react'

const ColExperimentalTabla = (props) => {
    return (
        <button
          type="button"
          className={`text-white py-1 px-2 capitalize rounded-2xl text-md ${
            props.experimental ? "bg-green-light-cummins" : "bg-red-cummins"
          }`}
        >
          {props.experimental ? "SI" : "NO"}
        </button>
      );
}

export default ColExperimentalTabla