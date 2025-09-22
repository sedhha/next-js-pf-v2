import { IResult } from '@/interfaces/api';
import { IContentfulUploadImage } from '@/interfaces/contentful';
import { environmentCheck } from '@/utils/envVariablesCheck';
import { cfImageSchema } from '@/utils/schemas/cf-images';
import client from '@/backend/contentful/managementClient';
environmentCheck();

// Set up API credentials and headers

const uploadSingleAsset = async (content: IContentfulUploadImage) =>
	client.then((envInstance) =>
		envInstance
			.createAsset({
				fields: {
					title: {
						'en-US': content.title
					},
					description: {
						'en-US': content.description
					},
					file: {
						'en-US': {
							upload: content.url,
							fileName: content.fileName,
							contentType: content.contentType
						}
					}
				}
			})
			.then((asset) =>
				asset.processForAllLocales().then((result) =>
					result.publish().then((details) => {
						return { prevUrl: content.url, newURL: details.fields.file['en-US'].url };
					})
				)
			)
	);

const uploadImagesToContentful = async (
	images: IContentfulUploadImage[]
): Promise<IResult<null>> => {
	const parsedImages = cfImageSchema.safeParse(images);
	if (!parsedImages.success)
		return {
			statusCode: 422,
			error: true,
			message: 'Invalid Payload for upload'
		};
	const imagesToUpload = parsedImages.data;

	const uploadPromises = imagesToUpload.map(
		(image) =>
			new Promise((resolve) =>
				uploadSingleAsset(image).then((res) => resolve(res))
			)
	);
	await Promise.all(uploadPromises);
	return {
		statusCode: 201,
		message: 'Upload Success',
		error: false
	};
};

export { uploadImagesToContentful };
