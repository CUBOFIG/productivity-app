import { useDispatch } from 'react-redux';
import { generateFakeTasks } from '../../utils/mixin';
import { Button, FloatingTimer, TableHistory } from '../../components';
import { TbLayoutGridAdd } from 'react-icons/tb';

const History = () => {
  const dispatch = useDispatch();

  const generateFakeHistory = () => {
    const fakeTasks = generateFakeTasks();
    dispatch({ type: 'global/generateHistory', payload: fakeTasks });
  };

  return (
    <div className="history">
      <FloatingTimer />
      <h2 className="mb-2 mt-4">History</h2>

      <Button
        className="mr-1"
        icon={TbLayoutGridAdd}
        onClick={generateFakeHistory}
        text="Generate fake history"
      />
      <TableHistory />
    </div>
  );
};

export default History;
