import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
} from "@tremor/react";

const colors = {
  "Ready for dispatch": "gray",
  Cancelled: "rose",
  Shipped: "emerald",
};

const TableComponent = ({
  columns,
  fields,
  rows,
  badgeColumns,
  buttons,
  title,
}) => {
  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>{title}</Title>
        <Badge color="gray">{rows.length}</Badge>
      </Flex>
      {/* <Text className="mt-2">Overview of this month's purchases</Text> */}
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeaderCell key={index}>{column}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {fields.map((field, fieldIndex) => (
                <TableCell key={fieldIndex}>
                  {badgeColumns.includes(fields[fieldIndex]) ? (
                    <Badge color={colors[item[fields[fieldIndex]]]} size="xs">
                      {item[fields[fieldIndex]]}
                    </Badge>
                  ) : (
                    item[fields[fieldIndex]]
                  )}
                </TableCell>
              ))}
              {buttons && (
                <TableCell>
                  {buttons.map((button, buttonIndex) => (
                    <Button key={buttonIndex} {...button}>
                      {button.label}
                    </Button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableComponent;

// EXAMPLE USAGE
const MembersTable = () => {
  const columns = [
    "Transaction ID",
    "User",
    "Item",
    "Status",
    "Amount",
    "Link",
  ];
  const fields = ["transactionID", "user", "item", "status", "amount", "link"];
  const badgeColumns = ["status"];
  const buttons = [
    { size: "xs", variant: "secondary", color: "gray", label: "See details" },
  ];
  const transactions = [
    {
      transactionID: "#123456",
      user: "Lena Mayer",
      item: "Under Armour Shorts",
      status: "Ready for dispatch",
      amount: "$ 49.90",
      link: "#",
    },
    {
      transactionID: "#999999",
      user: "John Doe",
      item: "Test Item",
      status: "Shipped",
      amount: "$ 99.99",
      link: "#",
    },
  ];
  return (
    <TableComponent
      columns={columns}
      fields={fields}
      rows={transactions}
      badgeColumns={badgeColumns}
      buttons={buttons}
    />
  );
};
