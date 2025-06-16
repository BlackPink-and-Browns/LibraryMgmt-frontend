import React from "react";

const history = [
  { title: "Clean Code", returned: true },
  { title: "JavaScript: The Good Parts", returned: true },
  { title: "System Design Interview", returned: false },
];

export default function BorrowHistory() {
  return (
    <section className="bg-white p-4 ">
      <h2 className="text-xl font-semibold mb-4">Borrow History</h2>
      {history.map((entry, idx) => (
        <div key={idx} className="mb-2">
          <p className="font-medium">{entry.title}</p>
          <p className={`text-sm ${entry.returned ? 'text-green-600' : 'text-red-600'}`}>
            {entry.returned ? "Returned" : "Not Returned"}
          </p>
        </div>
      ))}
    </section>
  );
}
