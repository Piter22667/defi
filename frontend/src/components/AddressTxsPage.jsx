import React, {useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';

import DashBoardLayout from "./DashBoardLayout";


export default function AddressTxsPage() {
    const [address, setAddress] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const rowsPerPage = 8;

    const handleSearch = async () => {
        setLoading(true);
        setPage(0);
        try {
            // Замените URL на ваш реальный эндпойнт
            const res = await fetch(`http://localhost:8080/tx/transactions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address }),
            });

            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            setTransactions(Array.isArray(data) ? data : []);
        } catch (e) {
            setTransactions([]);
        }
        setLoading(false);
    };


    const short = str => str ? `${str.slice(0, 6)}...${str.slice(-4)}` : "";

    const formatDate = timestamp => {
        if (!timestamp) return "";
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleString();
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // групуємо всі дані отримані з API для пагінації (paginatedRows містить об'єкти, де кожен об'єкт буде представляти одну транзакцію, тобто один рядок в таблиці))
    const paginatedRows = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    console.log(paginatedRows);

    return (
        <Box sx={{ px: 3, pt: 2 }}>
            <DashBoardLayout title="Address transactions on Ethereum mainnet">
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        sx={{ bgcolor: "#23262F", input: { color: "#fff" }, label: { color: "#fff" } }}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={loading || !address}
                    >
                        Check
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="transactions table">
                        <TableHead>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Hash</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row) => (
                                <TableRow key={row.hash}>
                                    <TableCell>{short(row.from)}</TableCell>
                                    <TableCell>{short(row.to)}</TableCell>
                                    <TableCell>{formatDate(row.timeStamp)}</TableCell>
                                    <TableCell>{row.value}</TableCell>
                                    <TableCell>
                                    <a
                                        href={`https://etherscan.io/tx/${row.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#1976d2", textDecoration: "underline" }}

                                    >
                                        {short(row.hash)}
                                    </a>
                                    </TableCell>
                                    <TableCell>
                                        {row.isError == "0" ? (
                                            <DoneIcon sx={{ color: "limegreen" }} />
                                        )  : (
                                            <ClearIcon sx={{ color: "red" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}


                            {paginatedRows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        {loading ?
                                            <CircularProgress />

                                            : "No transactions found"}
                                    </TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[]} // ховаємо опції вибору кількмості рядків на сторінку
                                    // (додатковий функціонал використаної таблиці з бібліотеки)
                                    colSpan={6}
                                    count={transactions.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </DashBoardLayout>
        </Box>
    );
}