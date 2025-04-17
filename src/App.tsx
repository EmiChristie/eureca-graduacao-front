import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Avatar, Box, Button, Card, HStack } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box w={"full"} h={"100vh"} alignContent={"center"} placeItems={"center"}>
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="" />
              <Avatar.Fallback name="Nue Camp" />
            </Avatar.Root>
            <Card.Title mt="2">Teste do ChakraUI</Card.Title>
            <Card.Description>
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
              Curabitur nec odio vel dui euismod fermentum.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">View</Button>
            <Button>Join</Button>
          </Card.Footer>
        </Card.Root>
      </Box>
    </>
  )
}

export default App
