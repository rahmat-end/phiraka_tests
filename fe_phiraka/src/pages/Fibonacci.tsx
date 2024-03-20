import { TableContainer, Table, TableCaption, Tr, Tbody, Td, Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { useFibonacci } from "@/pages/hook/useFibonacci"

export default function Fibonacci() {
    const { form, handleChange, generateFibonacciTable } = useFibonacci()
    const fibonacciTable = generateFibonacciTable()

    return (
        <Box
            mx={"auto"}
            my={"50px"}
            width={"80vw"}
            // border={"2px solid black"}
        >
            <form>
                <Text fontSize={"2xl"} fontWeight={"bold"} mb={"20px"}>
                    Fibonacci Number Generator
                </Text>
                <FormControl width={"150px"}>
                    <FormLabel>Rows</FormLabel>
                    <Input 
                        type="number"
                        placeholder="Isi jumlah baris ..." 
                        name="row" 
                        onChange={handleChange} 
                        value={form.row}
                    />
                </FormControl>
                <FormControl width={"150px"} my={"20px"}>
                    <FormLabel>Columns</FormLabel>
                    <Input 
                        type="number"
                        placeholder="Isi jumlah kolom ..." 
                        name="column" 
                        onChange={handleChange} 
                        value={form.column}
                    />
                </FormControl>
                {/* <Button 
                    backgroundColor={"green"} 
                    color={"white"} 
                    colorScheme="green" 
                    onClick={handleChange}
                >
                    Submit
                </Button> */}
            </form>
            <TableContainer mt={"50px"}>
                <Table variant='simple'>
                    <TableCaption>Result</TableCaption>
                    <Tbody>
                        {fibonacciTable.map((row, rowIndex) => (
                            <Tr key={rowIndex}>
                                {row.map((fibonacciNumber, colIndex) => (
                                    <Td key={colIndex}>{fibonacciNumber}</Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}