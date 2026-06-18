import { useState } from "react";
import SemesterCard from "./components/SemesterCard";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";
import { calculateCGPA } from "./utils/calculateCGPA";

function App() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [section, setSection] = useState("");

  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState([]);
  const [cgpa, setCgpa] = useState(null);

  const [semesters, setSemesters] = useState([
    {
      id: 1,
      semNumber: 1,
      subjects: [
        {
          id: 1,
          name: "",
          credits: "",
          gpa: "",
        },
      ],
    },
  ]);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: Date.now(),
        semNumber: semesters.length + 1,
        subjects: [
          {
            id: Date.now(),
            name: "",
            credits: "",
            gpa: "",
          },
        ],
      },
    ]);
  };

  const addSubject = (semesterId) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: [
                ...semester.subjects,
                {
                  id: Date.now(),
                  name: "",
                  credits: "",
                  gpa: "",
                },
              ],
            }
          : semester
      )
    );
  };

  const updateSubject = (
    semesterId,
    subjectId,
    field,
    value
  ) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) =>
                subject.id === subjectId
                  ? {
                      ...subject,
                      [field]: value,
                    }
                  : subject
              ),
            }
          : semester
      )
    );
  };

  const removeSubject = (
    semesterId,
    subjectId
  ) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.filter(
                (subject) => subject.id !== subjectId
              ),
            }
          : semester
      )
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!studentName.trim()) {
      newErrors.studentName = "Student Name is required";
    }

    if (!studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!section.trim()) {
      newErrors.section = "Section is required";
    }

    semesters.forEach((semester, semIndex) => {
      semester.subjects.forEach((subject, subIndex) => {
        if (!subject.name.trim()) {
          newErrors[
            `subject-${semIndex}-${subIndex}`
          ] = "Subject Name is required";
        }

        if (
          subject.credits === "" ||
          Number(subject.credits) <= 0
        ) {
          newErrors[
            `credits-${semIndex}-${subIndex}`
          ] = "Enter valid credits";
        }

        if (
          subject.gpa === "" ||
          Number(subject.gpa) < 0 ||
          Number(subject.gpa) > 10
        ) {
          newErrors[
            `gpa-${semIndex}-${subIndex}`
          ] = "GPA must be between 0 and 10";
        }
      });
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    const result = calculateCGPA(semesters);

    setCgpa(result);

    setHistory((prev) => [
      {
        id: Date.now(),
        name: studentName,
        studentId,
        section,
        cgpa: result,
      },
      ...prev,
    ]);
  };

  const clearForm = () => {
    setStudentName("");
    setStudentId("");
    setSection("");
    setCgpa(null);
    setErrors({});

    setSemesters([
      {
        id: 1,
        semNumber: 1,
        subjects: [
          {
            id: 1,
            name: "",
            credits: "",
            gpa: "",
          },
        ],
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 card-animation">

        <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-8 tracking-wide">
          CGPA Calculator
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div>
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) =>
                setStudentName(e.target.value)
              }
              className={`border rounded-lg p-3 w-full ${
                errors.studentName
                  ? "border-red-500"
                  : ""
              }`}
            />

            {errors.studentName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              className={`border rounded-lg p-3 w-full ${
                errors.studentId
                  ? "border-red-500"
                  : ""
              }`}
            />

            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentId}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Section"
              value={section}
              onChange={(e) =>
                setSection(e.target.value)
              }
              className={`border rounded-lg p-3 w-full ${
                errors.section
                  ? "border-red-500"
                  : ""
              }`}
            />

            {errors.section && (
              <p className="text-red-500 text-sm mt-1">
                {errors.section}
              </p>
            )}
          </div>

        </div>

        {semesters.map((semester) => (
          <SemesterCard
            key={semester.id}
            semester={semester}
            addSubject={addSubject}
            updateSubject={updateSubject}
            removeSubject={removeSubject}
            errors={errors}
          />
        ))}

        <div className="flex flex-wrap gap-4 mt-6">

          <button
            onClick={addSemester}
            className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600"
          >
            + Add Semester
          </button>

          <button
            onClick={handleCalculate}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
          >
            Calculate CGPA
          </button>

          <button
            onClick={clearForm}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600"
          >
            Clear Form
          </button>

        </div>

        {cgpa && <ResultCard cgpa={cgpa} />}

        <HistoryList history={history} />

      </div>
    </div>
  );
}

export default App;