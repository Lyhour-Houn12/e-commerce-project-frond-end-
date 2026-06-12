import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center py-12"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-4xl font-bold">Contact us</h1>
        <p className="mb-4 text-center text-gray-600">
          We would love to hear from you! Please fill out the form below or
          contact us directly
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="focus: mt-1 block w-full rounded-lg border border-gray-300 p-2 ring-blue-500 focus:ring-2 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="focus: mt-1 block w-full rounded-lg border border-gray-300 p-2 ring-blue-500 focus:ring-2 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              required
              className="focus: mt-1 block w-full rounded-lg border border-gray-300 p-2 ring-blue-500 focus:ring-2 focus:outline-hidden"
            />
          </div>

          <button className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600">
            Send Message
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="mt-4 flex flex-col items-center space-y-2">
            <div className="flex items-center">
              <FaPhone className="mr-2 text-blue-500" />
              <span className="text-gray-600">+855 70984211</span>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              <span className="text-gray-600">lyhour.houn.1233@gmail.com</span>
            </div>

            <div className="flex items-center">
              <FaMapMarkedAlt className="mr-2 text-blue-500" />
              <span className="text-gray-600">
                164pt, Toul Sangke, Phnom Penh
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
