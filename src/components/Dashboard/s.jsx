{/* Budget Cards */}
<div className="flex flex-wrap justify-center gap-6 mb-8 mt-8 ">
{[
  { title: "Fixed Budget", amount: "$500" },
  { title: "Fixed Expense", amount: "$400" },
  { title: "Used Expense", amount: "$300" },
].map((item, index) => (
  <div
    key={index}
    className="bg-white rounded-[20px] border-solid border-2 border-[#00000033] p-6 w-[220px] text-center"
  >
    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
    <p className="text-2xl font-bold">{item.amount}</p>
  </div>
))}
</div>

{/* Recent Expenses */}
<div className="bg-white w-full max-w-[1040px] rounded-[20px] border border-[#00000066] px-2 pb-4 pt-2 mb-6 m-auto">
<h2 className="text-center text-xl font-medium mb-4">
  Recent Expenses
</h2>
<hr className="mb-4 w-[900px] m-auto" />
<div className="flex flex-col space-y-2 text-center">
  <div className="flex justify-evenly">
    <span className="bg-[#0000001a] px-3 py-1 rounded text-sm font-medium">
      Category
    </span>
    {Array(5)
      .fill("Category 1")
      .map((cat, i) => (
        <span key={i}>{cat}</span>
      ))}
  </div>
  <div className="flex justify-evenly">
    <span className="bg-[#0000001a] px-3 py-1 rounded text-sm font-medium">
      Amount
    </span>
    {Array(5)
      .fill("Amount 1")
      .map((amt, i) => (
        <span key={i}>{amt}</span>
      ))}
  </div>
</div>
</div>

{/* Monthly Expense Summary */}
<div className="bg-white rounded-[20px] border border-[#00000066] p-6 w-full max-w-[1040px] m-auto">
<h2 className="text-center text-xl font-medium mb-3">
  Monthly Expense Summary
</h2>
<div className="grid grid-cols-4 gap-4 text-center font-medium mb-2">
  <span className="bg-gray-200 px-3 py-1 rounded">Category</span>
  <span className="bg-gray-200 px-3 py-1 rounded">Budget</span>
  <span className="bg-gray-200 px-3 py-1 rounded">Expense</span>
  <span className="bg-gray-200 px-3 py-1 rounded">-/+</span>
</div>
{Array(6)
  .fill(0)
  .map((_, i) => (
    <div
      key={i}
      className="grid grid-cols-4 gap-4 text-center text-sm py-1"
    >
      <span>Category 1</span>
      <span>Amount 1</span>
      <span>Amount 1</span>
      <span>Amount 1</span>
    </div>
  ))}
</div>