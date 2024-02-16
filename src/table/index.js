import React, { useEffect, useState } from "react";
import "./table.css";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

const TsFetch = [
  {
    id: 1,
    resource: "Hamza Boulahia",
    data: [
      { id: 1, project: "CDM-Valeurs", cons: "1h" },
      { id: 2, project: "Agilité(scrum)", cons: "2h" },
      { id: 3, project: "AWB-Suppotrt", cons: "2h" },
      { id: 4, project: "BMCE-Support", cons: "30 min" },
      { id: 5, project: "INWI-Support", cons: "1h" },
      { id: 6, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 7, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 8, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 9, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 10, project: "Formation", cons: "0h" },
    ],
  },
  {
    id: 2,
    resource: "Bilal Hafri",
    data: [
      { id: 1, project: "CDM-Valeurs", cons: "1h" },
      { id: 2, project: "Agilité(scrum)", cons: "2h" },
      { id: 3, project: "AWB-Suppotrt", cons: "2h" },
      { id: 4, project: "BMCE-Support", cons: "30 min" },
      { id: 5, project: "INWI-Support", cons: "1h" },
      { id: 6, project: "Ompic-Refonte de la solution", cons: "30min" },
    ],
  },
  {
    id: 2,
    resource: "Marouane Souhail",
    data: [
      { id: 1, project: "CDM-Valeurs", cons: "1h" },
      { id: 2, project: "Agilité(scrum)", cons: "2h" },
      { id: 3, project: "AWB-Suppotrt", cons: "2h" },
      { id: 4, project: "BMCE-Support", cons: "30 min" },
      { id: 5, project: "INWI-Support", cons: "1h" },
      { id: 6, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 7, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 8, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 9, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 10, project: "Formation", cons: "0h" },
      { id: 11, project: "Formation", cons: "2H" },
      { id: 12, project: "Formation", cons: "3H" },
      { id: 13, project: "Formation", cons: "4h" },
    ],
  },
  {
    id: 3,
    resource: "Marouane Souhail",
    data: [
      { id: 14, project: "Formation", cons: "2h" },
      { id: 15, project: "Formation", cons: "3h" },
      { id: 16, project: "Formation", cons: "4h" },
      { id: 17, project: "CDM-Valeurs", cons: "1h" },
      { id: 18, project: "Agilité(scrum)", cons: "2h" },
      { id: 19, project: "AWB-Suppotrt", cons: "2h" },
      { id: 20, project: "BMCE-Support", cons: "30 min" },
      { id: 21, project: "INWI-Support", cons: "1h" },
      { id: 22, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 23, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 24, project: "Ompic-Refonte de la solution", cons: "30min" },
      { id: 25, project: "Ompic-Refonte de la solution", cons: "30min" }
    ]
  }
];

const Table = () => {
  const [tsData, setTsData] = useState(TsFetch);
  const [bigInsideData, setBigInsideData] = useState(null);

  useEffect(() => {
    const maxLength = Math.max(...TsFetch.map((item) => item.data.length));
    setBigInsideData(maxLength);
  }, []);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("TimeSheet");

    // Determine the maximum length of projects and time consumed
    let maxDataLength = 0;
    tsData.forEach((item) => {
      if (item.data.length > maxDataLength) {
        maxDataLength = item.data.length;
      }
    });

    // Add headers
    const headers = ["Resource"];
    for (let i = 0; i < maxDataLength; i++) {
      headers.push("Projets", "Consomation");
    }
    const headerRow = worksheet.addRow(headers);

    // Set style for header row
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE699" },
      };
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Set width for all cells
    worksheet.columns.forEach((column) => {
      column.width = 25;
    });

    // Set height for header row
    headerRow.height = 20;

    // Set height for all rows
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.height = 20;
    });

    // Add data
    tsData.forEach((item) => {
      const rowData = [item.resource];

      item.data.forEach((project) => {
        rowData.push(project.project, project.cons);
      });

      // Fill in the remaining cells if the number of projects is less than maxDataLength
      const remainingCells = (maxDataLength - item.data.length) * 2;
      for (let i = 0; i < remainingCells; i++) {
        rowData.push("");
      }

      const row = worksheet.addRow(rowData);
      row.eachCell((cell, index) => {
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (index === 1) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE699" },
          };
        } else if (!cell.value && cell.value !== 0) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFA1A1" },
          };
        }
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Save the Excel file
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timesheet.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // const exportToExcel = async () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('TimeSheet');

  //   // Determine the maximum length of projects and time consumed
  //   let maxDataLength = 0;
  //   tsData.forEach(item => {
  //     if (item.data.length > maxDataLength) {
  //       maxDataLength = item.data.length;
  //     }
  //   });

  //   // Add headers
  //   const headers = ['Resource'];
  //   for (let i = 0; i < maxDataLength; i++) {
  //     headers.push('Project', 'Time Consumed');
  //   }
  //   const headerRow = worksheet.addRow(headers);

  //   // Set style for header row
  //   headerRow.fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'FFE699' }
  //   };
  //   headerRow.eachCell((cell) => {
  //     cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  //     cell.border = {
  //       top: {style:'thin'},
  //       left: {style:'thin'},
  //       bottom: {style:'thin'},
  //       right: {style:'thin'}
  //     };
  //   });

  //   // Set width for all cells
  //   worksheet.columns.forEach(column => {
  //     column.width = 25;
  //   });

  //   // Add data
  //   tsData.forEach(item => {
  //     const rowData = [item.resource];

  //     item.data.forEach(project => {
  //       rowData.push(project.project, project.cons);
  //     });

  //     // Fill in the remaining cells if the number of projects is less than maxDataLength
  //     const remainingCells = (maxDataLength - item.data.length) * 2;
  //     for (let i = 0; i < remainingCells; i++) {
  //       rowData.push('');
  //     }

  //     const row = worksheet.addRow(rowData);
  //     row.getCell(1).fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFE699' }
  //     };
  //     row.eachCell((cell) => {
  //       cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  //       cell.border = {
  //         top: {style:'thin'},
  //         left: {style:'thin'},
  //         bottom: {style:'thin'},
  //         right: {style:'thin'}
  //       };
  //       if (!cell.value && cell.value !== 0) {
  //         cell.fill = {
  //           type: 'pattern',
  //           pattern: 'solid',
  //           fgColor: { argb: 'FFA1A1' }
  //         };
  //       }
  //     });
  //   });

  //   // Generate Excel file
  //   const buffer = await workbook.xlsx.writeBuffer();

  //   // Save the Excel file
  //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'timesheet.xlsx';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // };

  // const exportToExcel = async () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('TimeSheet');

  //   // Determine the maximum length of projects and time consumed
  //   let maxDataLength = 0;
  //   tsData.forEach(item => {
  //     if (item.data.length > maxDataLength) {
  //       maxDataLength = item.data.length;
  //     }
  //   });

  //   // Add headers
  //   const headers = ['Resource'];
  //   for (let i = 0; i < maxDataLength; i++) {
  //     headers.push('Projet', 'Cons');
  //   }
  //   worksheet.addRow(headers);

  //   // Set style for header row
  //   const headerRow = worksheet.getRow(1);
  //   headerRow.fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'FFE699' }
  //   };

  //   // Add data and style for resource names
  //   tsData.forEach(item => {
  //     const rowData = [item.resource];

  //     item.data.forEach(project => {
  //       rowData.push(project.project, project.cons);
  //     });

  //     // Fill in the remaining cells if the number of projects is less than maxDataLength
  //     const remainingCells = (maxDataLength - item.data.length) * 2;
  //     for (let i = 0; i < remainingCells; i++) {
  //       rowData.push('');
  //     }

  //     worksheet.addRow(rowData);

  //     // Set style for the resource section
  //     const lastRow = worksheet.lastRow;
  //     lastRow.eachCell((cell, colNumber) => {
  //       if (colNumber === 1) { // For the first column (resource name)
  //         cell.fill = {
  //           type: 'pattern',
  //           pattern: 'solid',
  //           fgColor: { argb: 'FFE699' }
  //         };
  //       }
  //     });
  //   });

  //   // Generate Excel file
  //   const buffer = await workbook.xlsx.writeBuffer();

  //   // Save the Excel file
  //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'timesheet.xlsx';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // };

  // const exportToExcel = () => {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.aoa_to_sheet([]);

  //   // Determine the maximum length of projects and time consumed
  //   let maxDataLength = 0;
  //   tsData.forEach(item => {
  //     if (item.data.length > maxDataLength) {
  //       maxDataLength = item.data.length;
  //     }
  //   });

  //   // Add headers
  //   const headers = ['Resource'];
  //   for (let i = 0; i < maxDataLength; i++) {
  //     headers.push('Project', 'Time Consumed');
  //   }
  //   XLSX.utils.sheet_add_aoa(ws, [headers], { origin: -1 });

  //   // Add data
  //   tsData.forEach(item => {
  //     const rowData = [item.resource];

  //     item.data.forEach(project => {
  //       rowData.push(project.project, project.cons);
  //     });

  //     // Fill in the remaining cells if the number of projects is less than maxDataLength
  //     const remainingCells = (maxDataLength - item.data.length) * 2;
  //     for (let i = 0; i < remainingCells; i++) {
  //       rowData.push('');
  //     }

  //     XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
  //   });

  //   XLSX.utils.book_append_sheet(wb, ws, 'TimeSheet');
  //   XLSX.writeFile(wb, 'timesheet.xlsx');
  // };

  return (
    <div
      id="table-scroll"
      style={{ maxWidth: window.innerWidth - 100 }}
      className="table-scroll"
    >
      <span className="excel__button" onClick={exportToExcel}>
        Excel
      </span>
      <div className="table-wrap">
        <table className="main-table">
          <thead>
            <tr>
              <th className="fixed-side" scope="col">
                Ressource
              </th>
              {Array.from({ length: bigInsideData }, (_, index) => (
                <React.Fragment key={index}>
                  <th scope="col" className="consultaion_ts__tab">
                    Projet
                  </th>
                  <th scope="col" className="consultaion_ts__tab">
                    Consommation
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {tsData.length > 0 &&
              tsData.map((ele) => (
                <tr key={ele.id}>
                  <th className="fixed-side">{ele.resource}</th>
                  {Array.from({ length: bigInsideData }, (_, index) => {
                    const item = ele.data[index];
                    const isEmpty = !item || !item.project || !item.cons;
                    return (
                      <React.Fragment key={index}>
                        <td
                          className={`consultaion_ts__td ${
                            isEmpty ? "empty-cell" : ""
                          }`}
                        >
                          {item?.project || ""}
                        </td>
                        <td
                          className={`consultaion_ts__td ${
                            isEmpty ? "empty-cell" : ""
                          }`}
                        >
                          {item?.cons || ""}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
