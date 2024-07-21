import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ title }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-gray-100 shadow-xl bg-clip-border rounded-xl w-96 transition-transform duration-300 hover:translate-y-5">
      <div className="relative h-56 mx-4 my-4 overflow-hidden shadow-lg bg-clip-border rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
          alt="card-image"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <div className="p-2 ml-3">
        <h5 className="mb-2 font-serif text-2xl">
          {title}
        </h5>
        <p className="block font-sans text-lg ">
          Total Questions: 30
        </p>
      </div>
      <div className="p-5 mt-1">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => navigate(`/FreeSheet/${title}`)}
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default Card;
