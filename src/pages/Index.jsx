import { useState } from "react";
import { Container, VStack, Heading, Button, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, List, ListItem, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const toast = useToast();

  const addTransaction = () => {
    if (!description || !amount) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTransactions([...transactions, { description, amount: parseFloat(amount) }]);
    setDescription("");
    setAmount("");
    toast({
      title: "Transaction Added",
      description: "Your transaction has been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteTransaction = (index) => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
    toast({
      title: "Transaction Deleted",
      description: "Your transaction has been deleted successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={4} width="100%">
        <Heading>Finance Tracker</Heading>
        <VStack as="form" onSubmit={(e) => e.preventDefault()} spacing={4} width="100%">
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <NumberInput precision={2} step={0.01}>
            <NumberInputField placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTransaction}>
            Add Transaction
          </Button>
        </VStack>
        <List width="100%">
          {transactions.map((transaction, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center" paddingY={2}>
              <Text>
                {transaction.description} - ${transaction.amount.toFixed(2)}
              </Text>
              <Button size="sm" colorScheme="red" onClick={() => deleteTransaction(index)}>
                <FaTrash />
              </Button>
            </ListItem>
          ))}
        </List>
        <Text fontSize="xl">Total: ${totalAmount.toFixed(2)}</Text>
      </VStack>
    </Container>
  );
};

export default Index;
