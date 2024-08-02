import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-6 text-gray-700 bg-gray-80 shadow-xl bg-clip-border rounded-xl w-96 transition-transform duration-300 hover:translate-y-5 justify-center font-medium text-xl lg:text-3xl mx-6" onClick={() => navigate(`/FreeSheet/${title}`)}>
      <div className=" h-56 mx-4 my-4 overflow-hidden shadow-lg bg-clip-border rounded-xl">
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
      <div className="p-4">
        <button
          className="text-base py-3 px-3 rounded-lg bg-gray-900 text-white"
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
