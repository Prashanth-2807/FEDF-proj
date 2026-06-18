import SubjectRow from "./SubjectRow";

function SemesterCard({
  semester,
  addSubject,
  updateSubject,
  removeSubject,
}) {
  return (
    <div className="border rounded-xl p-5 mb-6 bg-gray-50 float-card card-animation">
      <h2 className="text-xl font-bold mb-4">
        Semester {semester.semNumber}
      </h2>

      {semester.subjects.map((subject) => (
        <SubjectRow
          key={subject.id}
          subject={subject}
          semesterId={semester.id}
          updateSubject={updateSubject}
          removeSubject={removeSubject}
        />
      ))}

      <button
        onClick={() => addSubject(semester.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        + Add Subject
      </button>
    </div>
  );
}

export default SemesterCard;