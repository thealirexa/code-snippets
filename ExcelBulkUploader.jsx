import React, { useState } from "react";
import XLSX from "xlsx";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Label,
  Input,
  Text,
} from "@chakra-ui/core";

const ExcelBulkUploader = () => {
  const [parsedData, setParsedData] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(worksheet, {
      header: ["First name", "Last name", "Email", "Phone"],
    });
    setParsedData(parsedData);
    uploadData(parsedData);
  };

  const uploadData = (data) => {
    axios.post("/api/register", JSON.stringify(data)).then(console.log).catch(console.error);
  };

  return (
    <Box mx="auto" maxW="600px" p={6}>
      <Label htmlFor="file-input">
        Select an Excel file to upload:
        <Input type="file" id="file-input" onChange={handleFileChange} />
      </Label>
      {parsedData.length > 0 ? (
        <>
          <Text mt={4}>Parsed data:</Text>
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>First name</Th>
                <Th>Last name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
              </Tr>
            </Thead>
            <Tbody>
              {parsedData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item["First name"]}</Td>
                  <Td>{item["Last name"]}</Td>
                  <Td>{item.Email}</Td>
                  <Td>{item.Phone}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <Text mt={4}>No data parsed yet. Upload an Excel file to begin.</Text>
      )}
    </Box>
  );
};

export default ExcelBulkUploader;
