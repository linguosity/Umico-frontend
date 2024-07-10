import { Table, Checkbox, Label } from 'flowbite-react';

const Loading = () => {
  return (
    <div className="animate-pulse">
      <div className="p-4">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="h-10 w-[5%]"></Table.HeadCell>
              <Table.HeadCell className="h-10 w-[25%]">
                <div className="bg-gray-200 rounded-full w-24"></div>
              </Table.HeadCell>
              <Table.HeadCell className="h-10 w-[20%]">
                <div className="bg-gray-200 rounded-full w-20"></div>
              </Table.HeadCell>
              <Table.HeadCell className="h-10 w-[15%]">
                <div className="bg-gray-200 rounded-full w-16"></div>
              </Table.HeadCell>
              <Table.HeadCell className="h-10 w-[35%]">
                <div className="bg-gray-200 rounded-full w-32"></div>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {[...Array(10)].map((_, rowIdx) => (
                <Table.Row key={rowIdx}>
                  <Table.Cell className="w-[5%]">
                    <div className="h-6 w-6 bg-gray-200 rounded-full mx-auto"></div>
                  </Table.Cell>
                  <Table.Cell className="w-[25%]">
                    <div className="h-2 bg-gray-200 rounded-full w-24"></div>
                  </Table.Cell>
                  <Table.Cell className="w-[20%]">
                    <div className="h-2 bg-gray-200 rounded-full w-20"></div>
                  </Table.Cell>
                  <Table.Cell className="w-[15%]">
                    <div className="h-2 bg-gray-200 rounded-full w-16"></div>
                  </Table.Cell>
                  <Table.Cell className="w-[35%]">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox disabled />
                        <div className="h-2 bg-gray-200 rounded-full w-16"></div>
                        <Checkbox disabled />
                        <div className="h-2 bg-gray-200 rounded-full w-20"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox disabled />
                        <div className="h-2 bg-gray-200 rounded-full w-12"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox disabled />
                        <div className="h-2 bg-gray-200 rounded-full w-20"></div>
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Loading;