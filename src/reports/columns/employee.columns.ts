// filepath: sae-backend/src/reports/columns/employee.columns.ts
import { ReportColumn } from "@reports/core/report-context";

export const EMPLOYEE_COLUMN = {
  id: {
    key: "id",
    header: "ID",
    width: 10,
    type: "number",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  employeeCode: {
    key: "employeeCode",
    header: "Legajo",
    width: 10,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  name: {
    key: "name",
    header: "Apellido y Nombre",
    width: 30,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "left" },
    },
  } as ReportColumn,

  dni: {
    key: "dni",
    header: "DNI",
    width: 10,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  cuil: {
    key: "cuil",
    header: "CUIL",
    width: 15,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  hireDate: {
    key: "hireDate",
    header: "Fecha Alta",
    width: 15,
    type: "date",
    format: "dd/mm/yyyy",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  birthDate: {
    key: "birthDate",
    header: "Fecha Nacimiento",
    width: 15,
    type: "date",
    format: "dd/mm/yyyy",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  seniority: {
    key: "seniority",
    header: "Antiguedad",
    width: 12,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  age: {
    key: "age",
    header: "Edad",
    width: 12,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  position: {
    key: "position",
    header: "Position",
    width: 15,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  category: {
    key: "category",
    header: "Category",
    width: 15,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  address: {
    key: "address",
    header: "Direction",
    width: 50,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "left" },
    },
  } as ReportColumn,

  phone: {
    key: "phone",
    header: "Celaular",
    width: 20,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,

  email: {
    key: "email",
    header: "Email",
    width: 25,
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "left" },
    },
  } as ReportColumn,

  status: {
    key: "status",
    header: "Estado",
    type: "string",
    style: {
      header: { bold: true, alignment: "center" },
      data: { alignment: "center" },
    },
  } as ReportColumn,
};
