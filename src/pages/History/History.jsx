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
        text="Generate fake history"
        icon={TbLayoutGridAdd}
        className="mr-1"
        onClick={generateFakeHistory}
      />
      <TableHistory />
    </div>
  );
};

export default History;
