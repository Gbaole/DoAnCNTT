import React from "react";
// import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { convertCurrency, prettyDate } from "../../Utils/toolkits";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";

function DynamicTable({
  array = [],
  sort = {},
  handleSort = () => {},
  onRowClick = () => {},
  definition = [],
}) {
  // const renderTooltip = (des) => <Tooltip id="button-tooltip-2">{des}</Tooltip>;

  return (
    <TableContainer>
      <Table variant="striped" style={{ marginTop: 10 }}>
        <Thead>
          <Tr>
            <Th>#</Th>
            {definition.map((record, id) => {
              return (
                <Th
                  key={id}
                  onClick={() => {
                    handleSort(record.key);
                  }}
                >
                  {record.dis}{" "}
                  {Object.hasOwn(sort, record.key)
                    ? sort[record.key] == 1
                      ? "▲"
                      : "▼"
                    : null}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {array.map((row, index1) => {
            return (
              <Tr
                key={index1}
                value={"abc"}
                onClick={() => {
                  onRowClick(index1);
                }}
              >
                <Td>{index1}</Td>
                {row &&
                  definition.map((val, index2) => {
                    return (
                      <Td key={index2}>
                        {val.type == "currency"
                          ? convertCurrency(row[val.key])
                          : val.type == "boolean"
                          ? row[val.key]?.toString()
                          : val.type == "date"
                          ? new Date(row[val.key]).toLocaleString("vi-VN")
                          : val.type == "period"
                          ? prettyDate(row[val.key])
                          : row[val.key]}
                      </Td>
                    );
                  })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DynamicTable;
