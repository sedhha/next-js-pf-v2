import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import classes from './Admin.module.css';
import Screen, { screens } from './screens';

const allOptions = [
	{ label: 'Select an Operation', value: 'selectOp' },
	{ label: 'Upload Image', value: screens.uploadImage }
];

const AdminOperations = () => {
	const { isAdmin } = useAppSelector((state) => state.navigation);
	const [selected, setSelected] = useState(allOptions[0]);

	if (!isAdmin) return <div>Not Found</div>;
	else
		return (
			<div className={classes.AdminContainer}>
				<p>You have selected: &apos;{selected.value}&apos;</p>
				<select
					onChange={(e) => {
						const selected = allOptions.find((item) => item.value === e.target.value);
						if (selected) setSelected(selected);
					}}
				>
					{allOptions.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
				<Screen screenKey={selected.value} />
			</div>
		);
};

export default AdminOperations;
