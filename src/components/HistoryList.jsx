function HistoryList({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 border rounded-xl p-6 bg-white float-card card-animation">
      <h2 className="text-2xl font-bold mb-4">
        Recent Calculations
      </h2>

      {history.map((item) => (
        <div
          key={item.id}
          className="border-b py-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">
              {item.name}
            </p>

            <p className="text-sm text-gray-500">
              ID: {item.studentId}
            </p>

            <p className="text-sm text-gray-500">
              Section: {item.section}
            </p>
          </div>

          <div className="font-bold text-green-600">
            CGPA: {item.cgpa}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryList;