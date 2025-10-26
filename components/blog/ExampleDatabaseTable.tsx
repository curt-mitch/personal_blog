import { dpPayrollData } from '../mockData/dpPayrollData';

export default async function ExampleDatabaseTable({ removedRow }) {
  const salarySum = dpPayrollData.reduce((previousSalary, currentEmployeeData) => {
    const currentSalary =
      currentEmployeeData['row_id'] !== removedRow ? currentEmployeeData.salary : 0;
    return previousSalary + currentSalary;
  }, 0);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Row ID</th>
            <th>Employee ID</th>
            <th>Manager ID</th>
            <th>Age</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {dpPayrollData.map((employeeData) => {
            if (employeeData['row_id'] !== removedRow) {
              return (
                <tr key={employeeData['row_id']}>
                  <td>{employeeData['row_id']}</td>
                  <td>{employeeData['employee_id']}</td>
                  <td>{employeeData['manager_id']}</td>
                  <td>{employeeData['age']}</td>
                  <td>{employeeData['salary']}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div>
        <p>Total Employee Salaries: {salarySum}</p>
      </div>
    </>
  );
}
