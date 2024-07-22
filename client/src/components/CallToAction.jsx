import { Button } from "flowbite-react";

// INTERNAL IMPORT
import img from "../asserts/logo_them.png";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Would you like to know more about me?</h2>
        <p className="text-gray-500 my-2">Checkout these resources</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.linkedin.com/in/shubham-danecha-99660a288/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check this out!!!
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src={img} />
      </div>
    </div>
  );
}
