import { Card, List, Table, Accordion } from 'flowbite-react';

const Loading = () => {
    return (
      <div role="status" className="animate-pulse p-4 w-full">
        <Card className="m-4 bg-amber-200">
          <List horizontal>
            <List.Item>
              <div className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
            </List.Item>
            <List.Item>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
            </List.Item>
          </List>
        </Card>
  
        <Card className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {Array.from({ length: 15 }).map((_, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    );
  }
  
  export default Loading;
  