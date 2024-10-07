import getStatusText from '@src/utils/getStatusText.ts'
import { Button } from 'antd';
import { ITask, ITaskStatus } from '@src/types/task.type.ts'

interface TaskColumnsProps {
	handleEdit: (task: ITask) => void;
	handleDelete: (id: string) => Promise<void>;
}

export const taskColumns = ({ handleEdit, handleDelete }: TaskColumnsProps) => [
	{
		title: 'Task Name',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		render: (status: ITaskStatus) => getStatusText(status),
	},
	{
		title: 'Location',
		dataIndex: ['location', 'name'],
		key: 'location',
	},
	{
		title: 'Actions',
		key: 'actions',
		render: (_: any, task: ITask) => (
			<div>
				<Button
					type="primary"
					onClick={() => handleEdit(task)}
					style={{ marginRight: 8 }}
				>
					Edit
				</Button>
				<Button
					type="primary"
					danger
					onClick={() => handleDelete(task._id as string)}
				>
					Delete
				</Button>
			</div>
		),
	},
];
