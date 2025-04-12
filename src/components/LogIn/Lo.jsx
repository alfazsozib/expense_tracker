{/* Left Side - LogIn Form */}
<h1 className="text-4xl font-freehand mb-10">Welcome</h1>

<div className="w-full max-w-md">
  <div className="flex gap-4 mb-4">
    <div className="flex flex-col w-1/2">
      <label className="text-[20px] font-normal text-[#000] mb-1">
        First Name
      </label>
      <input
        type="text"
        name="f_Name"
        className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
      />
    </div>
    <div className="flex flex-col w-1/2">
      <label className="text-[20px] font-normal text-[#000] mb-1">
        Last Name
      </label>
      <input
        type="text"
        name="l_Name"
        className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
      />
    </div>
  </div>

  <div className="flex flex-col mb-4">
    <label className="text-[20px] font-normal text-[#000] mb-1 ">
      Email
    </label>
    <input
      type="email"
      name="email"
      className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
    />
  </div>

  <div className="flex flex-col mb-6">
    <label className="text-[20px] font-normal text-[#000] mb-1">
      Password
    </label>
    <input
      type="password"
      name="password"
      className="px-4 py-2 rounded-md bg-[#d9d9d966] outline-none h-[50px]"
    />
  </div>

  <button
    name="submit"
    className="w-full bg-sky-300 text-[#000000bf] rounded mb-4 text-xl py-3 "
  >
    Create Account
  </button>

  <p className="text-sm mt-5">
    Already have an account?
    <a href="#" className="text-black underline ml-2 ">
      Login Here
    </a>
  </p>
</div>
<div className="flex gap-2 mt-[220px]">
  <div className="w-[170px] h-2 bg-sky-400 rounded-full"></div>
  <div className="w-[170px] h-2 bg-gray-300 rounded-full"></div>
</div>
{/* Right Side - Dashboard Preview */}
<div className="bg-[#CAF0F8] w-[50%] flex justify-end pt-[2%] pl-[4%] pb-[2%]">
          <div className="bg-white w-full h-full pt-[3%] pl-[3.8%] pb-[3%]">
            <img
              src={Image_1}
              alt=""
              className="w-full h-full  object-top"
            />
          </div>
        </div>