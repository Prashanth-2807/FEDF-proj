function SubjectRow({
  subject,
  semesterId,
  updateSubject,
  removeSubject,
}) {
  return (
    <div className="grid md:grid-cols-4 gap-3 mb-3">

      <input
        type="text"
        placeholder="Subject Name"
        value={subject.name}
        onChange={(e) =>
          updateSubject(
            semesterId,
            subject.id,
            "name",
            e.target.value
          )
        }
        className="border rounded-lg p-2"
      />

      <input
        type="number"
        placeholder="Credits"
        step="0.5"
        value={subject.credits}
        onChange={(e) =>
          updateSubject(
            semesterId,
            subject.id,
            "credits",
            e.target.value
          )
        }
        className="border rounded-lg p-2"
      />

      <input
        type="number"
        placeholder="Subject GPA"
        min="0"
        max="10"
        step="0.01"
        value={subject.gpa}
        onChange={(e) =>
          updateSubject(
            semesterId,
            subject.id,
            "gpa",
            e.target.value
          )
        }
        className="border rounded-lg p-2"
      />

      <button
        onClick={() =>
          removeSubject(
            semesterId,
            subject.id
          )
        }
        className="bg-red-500 text-white rounded-lg px-4"
      >
        Remove
      </button>

    </div>
  );
}

export default SubjectRow;