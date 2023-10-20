import { useState } from "react";
import Navigation from "../components/navbar";

export default function PostsPage() {
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setPulse(true);
    setTimeout(() => {
      setPulse(false);
    }, 700);
  };

  return (
    <>
      <header>
        <Navigation />
      </header>
      <div className="min-h-screen md:container md:mx-auto bg-white flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 p-2">
          <div className="card w-full h-[300px] md:h-auto md:w-4/5 glass">
            <div className="flex flex-row py-4">
              <div className="avatar">
                <div className="w-16 rounded-full mx-5">
                  <img
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  />
                </div>
              </div>
              <p className="flex-end text-sm capitalize pr-2 py-4">
                By UserMom 10.10.23 12:22
              </p>
            </div>
            <figure className="max-h-[200px] overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src="https://source.unsplash.com/random"
                alt="!"
              />
            </figure>
            <div className="card-body prose">
              <h2 className="card-title">How to make website?</h2>
              <p className="text-start">
                Today I learned that making a website is like skiing with
                rollerskates..?
              </p>
              <div className="card-actions justify-between">
                <a className="link link-hover link-accent">Read more..</a>
                <div className="card-actions justify-end">
                  <button
                    onClick={handleLike}
                    className={`focus:outline-none ${
                      pulse ? "animate-pulse" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={liked ? "red" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
