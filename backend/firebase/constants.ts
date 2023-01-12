import { throwAndLogError } from '../../utils/dev-utils';
const getCollectionPrefix = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'prod';
        case 'development':
        default:
            return 'dev';
    }
};
export const storeCollectionPaths = {
    feedback: 'feedback',
};

export const getCollectionPath = (path: string): string => {
    const prefix = getCollectionPrefix();
    const storagePath = storeCollectionPaths[path as keyof typeof storeCollectionPaths]
    if (!storagePath) {
        throwAndLogError(`Path for ${path} does not exist. Make sure you want to have a dynamic collection.`);
        return '';
    }
    return `${prefix}-${storagePath}`;
}
