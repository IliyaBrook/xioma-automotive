import { ITaskStatus } from '@src/types/task.type.ts'

const getStatusText = (status: ITaskStatus): string => {
	switch (status) {
		case ITaskStatus.NEW:
			return 'New';
		case ITaskStatus.IN_PROGRESS:
			return 'In Progress';
		case ITaskStatus.COMPLETED:
			return 'Completed';
		case ITaskStatus.ON_HOLD:
			return 'On Hold';
		case ITaskStatus.CANCELLED:
			return 'Cancelled';
		default:
			return 'Unknown';
	}
};

export default getStatusText;