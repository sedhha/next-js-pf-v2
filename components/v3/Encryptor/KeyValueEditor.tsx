import { AddNewPair } from './AddNewPair';
import { INewPairWithoutEdit } from './interfaces';

export const KeyValueEditor = ({
	newPairs,
	setNewPairs,
	createNewPair,
	removeThisPair
}: INewPairWithoutEdit) => (
	<>
		{newPairs.map((pair, index) => (
			<AddNewPair
				key={index}
				newKey={pair.email}
				newDescription={pair.description}
				setNewDescription={(value) => {
					const updatedPairs = [...newPairs];
					updatedPairs[index].description = value;
					setNewPairs(updatedPairs);
				}}
				setNewKey={(value) => {
					const updatedPairs = [...newPairs];
					updatedPairs[index].email = value;
					setNewPairs(updatedPairs);
				}}
				newValue={pair.password}
				setNewValue={(value) => {
					const updatedPairs = [...newPairs];
					updatedPairs[index].password = value;
					setNewPairs(updatedPairs);
				}}
				number={pair.number}
				setPhoneNumber={(value) => {
					const updatedPairs = [...newPairs];
					updatedPairs[index].number = value;
					setNewPairs(updatedPairs);
				}}
				createNewPair={createNewPair}
				removeThisPair={removeThisPair}
				index={index}
				isLast={index === newPairs.length - 1}
			/>
		))}
	</>
);
