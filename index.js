// Your code here
// Employee record structure
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Create time-in event
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employee;
  }
  
  // Create time-out event
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employee;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wage = hoursWorked * employee.payPerHour;
    return wage;
  }
  
  // Calculate total pay for all dates
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
      (total, date) => total + wagesEarnedOnDate(employee, date),
      0
    );
    return totalWages;
  }
  
  // Calculate total payroll for all employees
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce(
      (total, employee) => total + allWagesFor(employee),
      0
    );
    return totalPayroll;
  }
  
  // Sample employee data
  const employeeData = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
  ];
  
  // Sample time data
  const timeData = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]],
  ];
  
  // Create employee records
  const employees = createEmployeeRecords(employeeData);
  
  // Populate time data
  timeData.forEach(([firstName, timeStamps]) => {
    const employee = employees.find((emp) => emp.firstName === firstName);
    timeStamps.forEach((timeStamp) => {
      createTimeInEvent(employee, timeStamp);
      createTimeOutEvent(employee, timeStamp.replace("08", "18")); // Assume 10-hour workdays
    });
  });
  
  // Calculate and display total payroll
  console.log("Total Payroll:", calculatePayroll(employees));
  