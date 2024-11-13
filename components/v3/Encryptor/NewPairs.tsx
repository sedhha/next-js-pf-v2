import { AddNewPair } from './AddNewPair';

interface INewPair {
	addNewPair: boolean;
	newPairs: { key: string; value: string }[];
	setNewPairs: (value: { key: string; value: string }[]) => void;
	createNewPair: () => void;
	removeThisPair: (num: number) => void;
}

const NewPair = ({
	newPairs,
	setNewPairs,
	addNewPair,
	createNewPair,
	removeThisPair
}: INewPair) => {
	if (!addNewPair) return null;
	return (
		<>
			{newPairs.map((pair, index) => (
				<AddNewPair
					key={index}
					newKey={pair.key}
					setNewKey={(value) => {
						const updatedPairs = [...newPairs];
						updatedPairs[index].key = value;
						setNewPairs(updatedPairs);
					}}
					newValue={pair.value}
					setNewValue={(value) => {
						const updatedPairs = [...newPairs];
						updatedPairs[index].value = value;
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
};
export { NewPair };
