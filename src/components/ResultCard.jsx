function ResultCard({ cgpa }) {
  return (
    <div className="mt-6 bg-green-50 border rounded-xl p-6 result-glow card-animation">
      <h2 className="text-2xl font-bold mb-3">
        Result
      </h2>

      <p className="text-3xl font-bold text-green-700">
        CGPA: {cgpa}
      </p>
    </div>
  );
}

export default ResultCard;