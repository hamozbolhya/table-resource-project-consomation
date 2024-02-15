import React, { useEffect, useState } from "react";
import "./table.css";

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
];

const Table = () => {
  const [tsData, setTsData] = useState(TsFetch);
  const [bigInsideData, setBigInsideData] = useState(null);

  useEffect(() => {
    const maxLength = Math.max(...TsFetch.map((item) => item.data.length));
    setBigInsideData(maxLength);
  }, []);

  return (
    <div
      id="table-scroll"
      style={{ maxWidth: window.innerWidth - 100 }}
      className="table-scroll"
    >
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
