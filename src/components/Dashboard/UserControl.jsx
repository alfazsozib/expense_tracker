
import React from 'react'

function UserControl() {
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 bg-[#CAF0F8] flex items-center justify-center pt-[25px] pb-[25px]">
        <div className="w-[1125px] h-full bg-white rounded-[20px] flex flex-col items-start p-10">
          {/* Set a Monthly Expense 1 */}
          <div className="mb-12 w-full">
            <p className="text-xl font-medium mb-6 text-black">
              Set a Monthly Expense:
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text[#000000bf] text-xl font-normal mb-2">
                  Category
                </p>
                <input
                  name="Category"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Amount
                </p>
                <input
                  name="Amount"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <button className=" mt-9 py-2 px-4 bg-[#90E0EF] hover:bg-[#72bbc7] cursor-pointer rounded text-black text-xl font-medium">
                Add Expense
              </button>
            </div>
          </div>

          {/* Set a Monthly Budget 2 */}
          <div className="w-full">
            <p className="text-xl font-medium mb-6 text-black">
              Set a Monthly Budget:
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Month
                </p>
                <input
                  name="Month"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <div>
                <p className="text-[#000000bf] text-xl font-normal mb-2">
                  Amount
                </p>
                <input
                  name="Amount"
                  type="text"
                  className="w-[430px] h-[45px] bg-[#E5E5E5] rounded px-3"
                />
              </div>
              <button className="mt-9 py-2 px-4 bg-[#90E0EF] hover:bg-[#72bbc7] cursor-pointer rounded text-black text-xl font-medium">
                Add Budget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserControl