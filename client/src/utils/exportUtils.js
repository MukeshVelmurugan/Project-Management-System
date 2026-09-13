import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Export Projects to PDF
export const exportProjectsPDF = (projects) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Project Management System", 14, 20);

  doc.setFontSize(12);
  doc.text("Projects Report", 14, 30);

  const tableData = projects.map((p) => [
    p.name,
    p.status,
    `${p.progress}%`,
    p.startDate,
    p.endDate,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["Project", "Status", "Progress", "Start", "End"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save("Projects_Report.pdf");
};

// Export Projects to Excel
export const exportProjectsExcel = (projects) => {
  const data = projects.map((p) => ({
    Project: p.name,
    Description: p.description,
    Status: p.status,
    Progress: `${p.progress}%`,
    StartDate: p.startDate,
    EndDate: p.endDate,
  }));

  const sheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, sheet, "Projects");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "Projects_Report.xlsx");
};