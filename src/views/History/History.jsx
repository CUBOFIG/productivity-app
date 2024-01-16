import { FloatingTimer, TableHistory } from "../../components";

const History = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <FloatingTimer />
      <h2 className="mb-2 mt-4">History</h2>
      <TableHistory />
    </div>
  );
};

export default History;
