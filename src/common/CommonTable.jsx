import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
export default function CommonTable({ headers, list, actions }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell>{header.text}</TableCell>
          ))}
          {actions && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((data) => (
          <TableRow>
            {headers.map((header) => (
              <TableCell>{header.path(data)}</TableCell>
            ))}
            {actions &&
              actions.map((action) => (
                <TableCell
                  className="material-icons"
                  onClick={() => action.event(data)}
                  style={{ fontSize: 20 }}
                >
                  {action.icon}
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
