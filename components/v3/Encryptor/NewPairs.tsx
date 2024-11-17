import { AddNewPair } from './AddNewPair';
import { INewPair } from './interfaces';
import { JsonEditor } from './JsonEditor';
import { KeyValueEditor } from './KeyValueEditor';

const NewPair = ({
	newPairs,
	setNewPairs,
	addNewPair,
	createNewPair,
	removeThisPair,
	editInJson
}: INewPair) => {
	if (!addNewPair) return null;
	return editInJson ? (
		<JsonEditor json={newPairs} setNewPairs={setNewPairs} />
	) : (
		<KeyValueEditor
			newPairs={newPairs}
			setNewPairs={setNewPairs}
			createNewPair={createNewPair}
			removeThisPair={removeThisPair}
		/>
	);
};
export { NewPair };
