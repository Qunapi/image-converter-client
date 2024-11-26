import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Image } from "../../api";

interface ImagesTableProps {
  data: Image[];
}

export const ImagesTable = (props: ImagesTableProps) => {
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Processed Image</TableCell>
            <TableCell>File Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={row.url} alt="processed" width="100" />
              </TableCell>
              <TableCell>
                {row.processedUrl ? (
                  <img src={row.processedUrl} alt="processed" width="100" />
                ) : null}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
