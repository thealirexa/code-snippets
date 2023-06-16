import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React from "react";
import * as XLSX from "xlsx";

function JsonToExcel() {
  const excelKeys = ["Name", "Email", "Address", "Phone", "Date Created"];

  const fetchData = async () => {
    try {
      const response = await axios.get("URL");
      const jsonData = response.data;
      const csvArray = jsonData.map((item) => [
        `${item.firstName} ${item.lastName}`,
        item.email,
        item.address,
        item.phoneNumber,
        item.createdDate,
      ]);
      const csvObject = Object.fromEntries(csvArray);
      const worksheet = XLSX.utils.aoa_to_sheet([excelKeys, ...csvArray]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet);
      XLSX.writeFile(workbook, "sample.xlsx");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={fetchData} icon={<DownloadOutlined />}>
        Download
      </Button>
    </div>
  );
}

export default JsonToExcel;
