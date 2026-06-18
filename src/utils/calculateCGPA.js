export const calculateCGPA = (semesters) => {
  let totalCredits = 0;
  let totalPoints = 0;

  semesters.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      const credits = Number(subject.credits);
      const gpa = Number(subject.gpa);

      if (!isNaN(credits) && !isNaN(gpa)) {
        totalCredits += credits;
        totalPoints += credits * gpa;
      }
    });
  });

  if (totalCredits === 0) return "0.00";

  return (totalPoints / totalCredits).toFixed(2);
};